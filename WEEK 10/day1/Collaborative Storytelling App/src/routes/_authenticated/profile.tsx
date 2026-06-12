import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Save, BookOpen, Check } from "lucide-react";
import { getMyStories } from "@/lib/stories.functions";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — StoryWeave" },
      { name: "description", content: "Your StoryWeave profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = (supabase as any).auth?.getUser?.();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const fetchStories = useServerFn(getMyStories);

  const { data: stories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: () => fetchStories(),
  });

  const handleSave = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, bio })
      .eq("id", userId);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="font-serif text-3xl font-bold text-foreground">Your Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-lg font-serif">
                SW
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Avatar uploads coming soon</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <Button onClick={handleSave}>
            {saved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {saved ? "Saved" : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Your Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{stories.length} stories</p>
        </CardContent>
      </Card>
    </div>
  );
}
