-- Revoke from anon as well for trigger functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;

-- Add policies to user_roles so RLS has coverage
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Ensure has_role is not callable by anon
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;