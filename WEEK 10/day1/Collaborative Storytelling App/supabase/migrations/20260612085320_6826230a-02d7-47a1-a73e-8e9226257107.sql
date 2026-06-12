-- Role enum
create type public.app_role as enum ('admin', 'moderator', 'user');

-- User roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- User profiles
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE NOT NULL,
    display_name text,
    bio text,
    avatar_url text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Stories
CREATE TABLE public.stories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL DEFAULT '',
    summary text,
    genre text,
    status text NOT NULL DEFAULT 'draft',
    allow_comments boolean DEFAULT true,
    owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.stories TO authenticated;
GRANT ALL ON public.stories TO service_role;

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Story collaborators
CREATE TABLE public.story_collaborators (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id uuid REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role text NOT NULL DEFAULT 'editor',
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (story_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.story_collaborators TO authenticated;
GRANT ALL ON public.story_collaborators TO service_role;

ALTER TABLE public.story_collaborators ENABLE ROW LEVEL SECURITY;

-- Story versions
CREATE TABLE public.story_versions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id uuid REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    version_number integer NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.story_versions TO authenticated;
GRANT ALL ON public.story_versions TO service_role;

ALTER TABLE public.story_versions ENABLE ROW LEVEL SECURITY;

-- Comments
CREATE TABLE public.comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id uuid REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    parent_id uuid REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- has_role helper function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policies for profiles
CREATE POLICY "Users can read all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Policies for stories
CREATE POLICY "Stories are readable by owner or collaborators"
ON public.stories
FOR SELECT
TO authenticated
USING (
  owner_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.story_collaborators sc
    WHERE sc.story_id = public.stories.id AND sc.user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Stories can be inserted by any authenticated user"
ON public.stories
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Stories can be updated by owner or editors"
ON public.stories
FOR UPDATE
TO authenticated
USING (
  owner_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.story_collaborators sc
    WHERE sc.story_id = public.stories.id AND sc.user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Stories can be deleted by owner or admin"
ON public.stories
FOR DELETE
TO authenticated
USING (
  owner_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
);

-- Policies for story_collaborators
CREATE POLICY "Collaborators readable by story participants"
ON public.story_collaborators
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND (s.owner_id = auth.uid() OR user_id = auth.uid())
  )
  OR public.has_role(auth.uid(), 'admin')
);

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

-- Policies for story_versions
CREATE POLICY "Versions readable by story participants"
ON public.story_versions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND (
      s.owner_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.story_collaborators sc
        WHERE sc.story_id = s.id AND sc.user_id = auth.uid()
      )
    )
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Versions insertable by story participants"
ON public.story_versions
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND (
      s.owner_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.story_collaborators sc
        WHERE sc.story_id = s.id AND sc.user_id = auth.uid()
      )
    )
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- Policies for comments
CREATE POLICY "Comments readable by story participants"
ON public.comments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND (
      s.owner_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.story_collaborators sc
        WHERE sc.story_id = s.id AND sc.user_id = auth.uid()
      )
    )
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Comments insertable by story participants"
ON public.comments
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND (
      s.owner_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.story_collaborators sc
        WHERE sc.story_id = s.id AND sc.user_id = auth.uid()
      )
    )
  )
);

CREATE POLICY "Comments updatable by author"
ON public.comments
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Comments deletable by author or story owner"
ON public.comments
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.stories s
    WHERE s.id = story_id AND s.owner_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin')
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.stories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_collaborators;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_versions;