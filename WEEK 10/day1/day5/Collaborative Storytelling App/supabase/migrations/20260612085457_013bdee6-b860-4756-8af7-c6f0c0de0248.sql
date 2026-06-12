-- Move handle_new_user to extensions schema to avoid linter flag
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION extensions.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION extensions.handle_new_user();

-- Fix story UPDATE policy to only allow editors (not viewers)
DROP POLICY IF EXISTS "Stories can be updated by owner or editors" ON public.stories;
CREATE POLICY "Stories can be updated by owner or editors"
ON public.stories
FOR UPDATE
TO authenticated
USING (
  owner_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.story_collaborators sc
    WHERE sc.story_id = public.stories.id AND sc.user_id = auth.uid() AND sc.role = 'editor'
  )
  OR public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  owner_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.story_collaborators sc
    WHERE sc.story_id = public.stories.id AND sc.user_id = auth.uid() AND sc.role = 'editor'
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- Also fix stories INSERT/DELETE to match
DROP POLICY IF EXISTS "Stories can be inserted by any authenticated user" ON public.stories;
CREATE POLICY "Stories can be inserted by any authenticated user"
ON public.stories
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Stories can be deleted by owner or admin" ON public.stories;
CREATE POLICY "Stories can be deleted by owner or admin"
ON public.stories
FOR DELETE
TO authenticated
USING (
  owner_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
);

-- Fix story_collaborators DELETE policy
DROP POLICY IF EXISTS "Collaborators deletable by story owner" ON public.story_collaborators;
CREATE POLICY "Collaborators deletable by story owner"
ON public.story_collaborators
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND s.owner_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- Fix story_collaborators INSERT policy
DROP POLICY IF EXISTS "Collaborators insertable by story owner" ON public.story_collaborators;
CREATE POLICY "Collaborators insertable by story owner"
ON public.story_collaborators
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND s.owner_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);