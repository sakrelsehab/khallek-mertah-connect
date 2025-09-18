-- Fix security vulnerability: Restrict profiles table access to protect personal information

-- Drop the insecure public read policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Optional: Create a separate policy for limited public profile info (excluding sensitive data)
-- This allows viewing of non-sensitive profile data for app functionality (like displaying store owners)
-- Users can uncomment this if they need public profile display functionality
-- CREATE POLICY "Limited public profile info" 
-- ON public.profiles 
-- FOR SELECT 
-- USING (
--   user_id IN (
--     SELECT DISTINCT owner_id FROM stores WHERE is_active = true
--     UNION 
--     SELECT DISTINCT owner_id FROM properties WHERE is_active = true
--   )
-- );

-- Note: Phone numbers and other sensitive data are now protected
-- Only the profile owner can access their complete profile information