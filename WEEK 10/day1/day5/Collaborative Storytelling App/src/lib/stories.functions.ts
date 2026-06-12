import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const getMyStories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data, error } = await supabase
      .from("stories")
      .select(
        `
        id, title, summary, genre, status, owner_id, created_at, updated_at, allow_comments,
        story_collaborators(count)
      `
      )
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((s) => ({
      ...s,
      collaborator_count: (s as any)["story_collaborators"]?.[0]?.count ?? 0,
    }));
  });

export const getStory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ storyId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { data: story, error } = await supabase
      .from("stories")
      .select(
        `
        *,
        owner:profiles!owner_id(*),
        collaborators:story_collaborators(*, user:profiles(*))
      `
      )
      .eq("id", data.storyId)
      .single();

    if (error) throw error;
    return story;
  });

export const createStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        title: z.string().min(1).max(200),
        summary: z.string().max(500).optional(),
        genre: z.string().max(50).optional(),
      })
      .parse(input)
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { data: story, error } = await supabase
      .from("stories")
      .insert({
        title: data.title,
        summary: data.summary,
        genre: data.genre,
        owner_id: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return story;
  });

export const updateStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        storyId: z.string(),
        title: z.string().min(1).max(200).optional(),
        content: z.string().optional(),
        summary: z.string().max(500).optional(),
        genre: z.string().max(50).optional(),
        status: z.enum(["draft", "published", "archived"]).optional(),
        allow_comments: z.boolean().optional(),
      })
      .parse(input)
  )
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { storyId, ...update } = data;
    const { error } = await supabase.from("stories").update(update).eq("id", storyId);
    if (error) throw error;
    return { success: true };
  });

export const saveVersion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        storyId: z.string(),
        title: z.string(),
        content: z.string(),
        versionNumber: z.number(),
      })
      .parse(input)
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("story_versions").insert({
      story_id: data.storyId,
      title: data.title,
      content: data.content,
      created_by: userId,
      version_number: data.versionNumber,
    });
    if (error) throw error;
    return { success: true };
  });

export const getVersions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ storyId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { data: versions, error } = await supabase
      .from("story_versions")
      .select("*, creator:profiles!created_by(username, display_name)")
      .eq("story_id", data.storyId)
      .order("version_number", { ascending: false });

    if (error) throw error;
    return versions || [];
  });

export const addCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ storyId: z.string(), username: z.string().min(1) }).parse(input)
  )
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    // Find user by username
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", data.username)
      .single();

    if (profileError || !profile) throw new Error("User not found");

    const { error } = await supabase.from("story_collaborators").insert({
      story_id: data.storyId,
      user_id: profile.id,
      role: "editor",
    });

    if (error) throw error;
    return { success: true };
  });
