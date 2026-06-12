import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Search, Users, Clock, PenLine } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getMyStories } from "@/lib/stories.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Dashboard — StoryWeave" },
      { name: "description", content: "Your stories and collaborations." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [search, setSearch] = useState("");
  const fetchStories = useServerFn(getMyStories);
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => fetchStories(),
  });

  const filtered = stories.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.summary && s.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Your stories</h1>
          <p className="mt-1 text-muted-foreground">Create, collaborate, and share your narratives.</p>
        </div>
        <Button asChild>
          <Link to="/stories/new">
            <Plus className="mr-2 h-4 w-4" />
            New story
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stories..."
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted" />
              <CardContent className="h-16 bg-muted/50" />
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
            {search ? "No stories found" : "No stories yet"}
          </h3>
          <p className="mt-1 max-w-sm text-muted-foreground">
            {search
              ? "Try a different search term."
              : "Start your first story and invite collaborators to weave tales together."}
          </p>
          {!search && (
            <Button className="mt-6" asChild>
              <Link to="/stories/new">
                <Plus className="mr-2 h-4 w-4" />
                Create your first story
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story) => (
            <Link
              key={story.id}
              to="/stories/$storyId"
              params={{ storyId: story.id }}
              className="group block"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary">
                      {story.title || "Untitled Story"}
                    </CardTitle>
                    <Badge variant={story.status === "published" ? "default" : "secondary"}>
                      {story.status}
                    </Badge>
                  </div>
                  {story.summary && (
                    <CardDescription className="line-clamp-2">{story.summary}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(story.updated_at), { addSuffix: true })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {story.collaborator_count || 0} collaborators
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
