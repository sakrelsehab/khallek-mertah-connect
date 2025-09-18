-- Fix security vulnerability: Remove public read access to User's table
-- and implement proper user-specific access control

-- Drop the existing insecure policy that allows public read access
DROP POLICY IF EXISTS "Enable read access for all users" ON public."User's";

-- Create a secure policy that only allows users to see their own data
-- Note: This assumes the table should have a user_id column to link to auth.users
-- Since we can't see the exact structure, we'll create policies based on the email field

-- Policy to allow users to see only their own record (if email matches their auth email)
CREATE POLICY "Users can only view their own data" 
ON public."User's" 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);

-- Policy to allow users to update only their own record
CREATE POLICY "Users can update their own data" 
ON public."User's" 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);

-- Policy to allow users to insert their own record
CREATE POLICY "Users can insert their own data" 
ON public."User's" 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);

-- Note: No DELETE policy created for security - users should not be able to delete records