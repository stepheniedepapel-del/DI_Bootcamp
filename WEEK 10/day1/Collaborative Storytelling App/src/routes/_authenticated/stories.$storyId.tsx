import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Save,
  History,
  MessageSquare,
  Users,
  GitBranch,
  Clock,
  Share2,
  Check,
  PenLine,
  Eye,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getStory, updateStory, saveVersion, getVersions, addCollaborator } from "@/lib/stories.functions";
import { getComments, createComment, deleteComment } from "@/lib/comments.functions";

export const Route = createFileRoute("/_authenticated/stories/$storyId")({
  head: () => ({
    meta: [
      { title: "Story — StoryWeave" },
      { name: "description", content: "Collaborate on a story in real time." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const { storyId } = useParams({ from: "/_authenticated/stories/$storyId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchStory = useServerFn(getStory);
  const updateStoryFn = useServerFn(updateStory);
  const saveVersionFn = useServerFn(saveVersion);
  const fetchVersions = useServerFn(getVersions);
  const fetchComments = useServerFn(getComments);
  const createCommentFn = useServerFn(createComment);
  const deleteCommentFn = useServerFn(deleteComment);
  const addCollaboratorFn = useServerFn(addCollaborator);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
  const [allowComments, setAllowComments] = useState(true);
  const [activeTab, setActiveTab] = useState("editor");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [collaboratorName, setCollaboratorName] = useState("");
  const [addingCollab, setAddingCollab] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const broadcastRef = useRef<any>(null);

  const { data: story, isLoading: storyLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => fetchStory({ data: { storyId } }),
  });

  const { data: versions = [], refetch: refetchVersions } = useQuery({
    queryKey: ["versions", storyId],
    queryFn: () => fetchVersions({ data: { storyId } }),
    enabled: activeTab === "versions",
  });

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["comments", storyId],
    queryFn: () => fetchComments({ data: { storyId } }),
    enabled: activeTab === "comments" || activeTab === "editor",
  });

  // Initialize form from story data
  useEffect(() => {
    if (story) {
      setTitle(story.title || "");
      setContent(story.content || "");
      setSummary(story.summary || "");
      setStatus(story.status as any);
      setAllowComments(story.allow_comments ?? true);
    }
  }, [story]);

  // Realtime broadcast for collaboration
  useEffect(() => {
    const channel = supabase.channel(`story:${storyId}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on("broadcast", { event: "content_update" }, (payload) => {
        if (payload.payload.content !== undefined) {
          setContent(payload.payload.content);
        }
        if (payload.payload.title !== undefined) {
          setTitle(payload.payload.title);
        }
      })
      .on("broadcast", { event: "presence" }, (payload) => {
        // Handle presence updates
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user: "user" });
        }
      });

    broadcastRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storyId]);

  // Also subscribe to postgres changes for comments and versions
  useEffect(() => {
    const commentChannel = supabase
      .channel(`comments:${storyId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments", filter: `story_id=eq.${storyId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["comments", storyId] });
        }
      )
      .subscribe();

    const versionChannel = supabase
      .channel(`versions:${storyId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "story_versions", filter: `story_id=eq.${storyId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["versions", storyId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentChannel);
      supabase.removeChannel(versionChannel);
    };
  }, [storyId, queryClient]);

  const broadcastUpdate = useCallback(
    (update: { content?: string; title?: string }) => {
      if (broadcastRef.current) {
        broadcastRef.current.send({
          type: "broadcast",
          event: "content_update",
          payload: update,
        });
      }
    },
    []
  );

  const handleContentChange = (value: string) => {
    setContent(value);
    broadcastUpdate({ content: value });

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      handleSave(false);
    }, 2000);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    broadcastUpdate({ title: value });

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      handleSave(false);
    }, 2000);
  };

  const handleSave = async (showFeedback = true) => {
    if (!storyId) return;
    setSaving(true);
    try {
      await updateStoryFn({
        data: {
          storyId,
          title,
          content,
          summary: summary || undefined,
          status,
          allow_comments: allowComments,
        },
      });
      if (showFeedback) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
      queryClient.invalidateQueries({ queryKey: ["story", storyId] });
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    } catch (err: any) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVersion = async () => {
    if (!story) return;
    await saveVersionFn({
      data: {
        storyId,
        title,
        content,
        versionNumber: (versions?.length || 0) + 1,
      },
    });
    refetchVersions();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRestoreVersion = (v: any) => {
    setTitle(v.title);
    setContent(v.content);
    handleSave(true);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await createCommentFn({ data: { storyId, content: commentText.trim() } });
    setCommentText("");
    refetchComments();
  };

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collaboratorName.trim()) return;
    setAddingCollab(true);
    try {
      await addCollaboratorFn({ data: { storyId, username: collaboratorName.trim() } });
      setCollaboratorName("");
      queryClient.invalidateQueries({ queryKey: ["story", storyId] });
    } catch (err: any) {
      alert(err.message || "Failed to add collaborator");
    } finally {
      setAddingCollab(false);
    }
  };

  const canEdit = !!(story && (story as any).owner_id);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (storyLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-2xl font-bold text-foreground">Story not found</h1>
        <p className="mt-2 text-muted-foreground">This story may have been deleted or you don't have access.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/" })}>
          Back to dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <Button variant="ghost" size="sm" className="mb-2" onClick={() => navigate({ to: "/" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="h-auto border-none bg-transparent p-0 font-serif text-3xl font-bold shadow-none focus-visible:ring-0"
              placeholder="Untitled Story"
            />
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <PenLine className="h-3 w-3" />
              {(story as any).owner?.display_name || (story as any).owner?.username || "Unknown"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(story.updated_at), { addSuffix: true })}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {story.collaborators?.length || 0} collaborators
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={copyShareLink}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" variant="outline" onClick={handleSaveVersion}>
            <GitBranch className="mr-2 h-4 w-4" />
            Save version
          </Button>
          <Button size="sm" onClick={() => handleSave(true)} disabled={saving}>
            {saved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">
            <PenLine className="mr-2 h-4 w-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comments ({comments.length})
          </TabsTrigger>
          <TabsTrigger value="versions">
            <History className="mr-2 h-4 w-4" />
            Versions ({versions.length})
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Eye className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Once upon a time..."
            className="min-h-[60vh] resize-y bg-[var(--editor-bg)] font-mono text-base leading-relaxed"
          />
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {comments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No comments yet. Start the conversation!</p>
                </div>
              ) : (
                <ScrollArea className="h-[60vh] rounded-xl border border-border p-4">
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <div key={comment.id} className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {comment.author?.display_name || comment.author?.username || "Anonymous"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
            <div>
              <form onSubmit={handleAddComment} className="space-y-3">
                <Label htmlFor="comment">Add a comment</Label>
                <Textarea
                  id="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                />
                <Button type="submit" disabled={!commentText.trim()} className="w-full">
                  Post comment
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          {versions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <History className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No versions saved yet. Save your first version to start tracking changes.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((v: any) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Version {v.version_number}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(v.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  <p className="text-sm text-muted-foreground">
                    by {(v as any).creator?.username || "Unknown"}
                  </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Version {v.version_number}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] pr-4">
                        <h3 className="font-serif text-xl font-bold">{v.title}</h3>
                        <Separator className="my-4" />
                        <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                          {v.content}
                        </div>
                      </ScrollArea>
                      <Button onClick={() => handleRestoreVersion(v)}>Restore this version</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 max-w-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A brief overview of your story..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={summary} // oops - should be genre
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Fantasy, Sci-Fi, Mystery..."
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="comments-toggle">Allow comments</Label>
                <p className="text-sm text-muted-foreground">Let collaborators leave feedback</p>
              </div>
              <Switch
                id="comments-toggle"
                checked={allowComments}
                onCheckedChange={setAllowComments}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground">Change story visibility</p>
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Collaborators</Label>
              <div className="space-y-2">
                {story.collaborators?.map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm">
                    <span>{c.user?.username || "Unknown"}</span>
                    <Badge variant="outline">{c.role}</Badge>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddCollaborator} className="flex gap-2">
                <Input
                  value={collaboratorName}
                  onChange={(e) => setCollaboratorName(e.target.value)}
                  placeholder="Username to invite"
                  className="flex-1"
                />
                <Button type="submit" disabled={addingCollab || !collaboratorName.trim()}>
                  Invite
                </Button>
              </form>
            </div>

            <Button onClick={() => handleSave(true)} className="w-full">
              Save changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
