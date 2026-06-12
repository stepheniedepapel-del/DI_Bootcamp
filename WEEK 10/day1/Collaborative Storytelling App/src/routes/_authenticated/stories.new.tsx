import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, BookOpen } from "lucide-react";
import { createStory } from "@/lib/stories.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_authenticated/stories/new")({
  head: () => ({
    meta: [
      { title: "New Story — StoryWeave" },
      { name: "description", content: "Create a new story on StoryWeave." },
    ],
  }),
  component: NewStoryPage,
});

function NewStoryPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const createStoryFn = useServerFn(createStory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const story = await createStoryFn({
        data: { title, summary: summary || undefined, genre: genre || undefined },
      });
      if (story && story.id) {
        navigate({ to: "/stories/$storyId", params: { storyId: story.id } });
      }
    } catch (err: any) {
      setError(err.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate({ to: "/" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">New story</h1>
        <p className="mt-1 text-muted-foreground">Begin a new narrative and invite collaborators.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Great Adventure"
              className="pl-10"
              required
              maxLength={200}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Fantasy, Sci-Fi, Mystery..."
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A brief overview of your story..."
            rows={4}
            maxLength={500}
          />
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading || !title.trim()}>
            {loading ? "Creating..." : "Create story"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/" })}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
