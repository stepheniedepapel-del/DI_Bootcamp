import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const getComments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ storyId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { data: comments, error } = await supabase
      .from("comments")
      .select(
        `
        *,
        author:profiles!user_id(username, display_name, avatar_url)
      `
      )
      .eq("story_id", data.storyId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return comments || [];
  });

export const createComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        storyId: z.string(),
        content: z.string().min(1).max(2000),
        parentId: z.string().optional(),
      })
      .parse(input)
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("comments").insert({
      story_id: data.storyId,
      user_id: userId,
      content: data.content,
      parent_id: data.parentId || null,
    });
    if (error) throw error;
    return { success: true };
  });

export const deleteComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ commentId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { supabase } = context;
    const { error } = await supabase.from("comments").delete().eq("id", data.commentId);
    if (error) throw error;
    return { success: true };
  });
