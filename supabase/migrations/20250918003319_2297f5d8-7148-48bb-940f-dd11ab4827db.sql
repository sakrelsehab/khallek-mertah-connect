-- Fix security vulnerability: Update existing policies on User's table

-- Drop all existing policies on the User's table
DROP POLICY IF EXISTS "Enable read access for all users" ON public."User's";
DROP POLICY IF EXISTS "Users can only view their own data" ON public."User's";
DROP POLICY IF EXISTS "Users can update their own data" ON public."User's";
DROP POLICY IF EXISTS "Users can insert their own data" ON public."User's";

-- Create secure policies that only allow users to access their own data
CREATE POLICY "Secure user data access" 
ON public."User's" 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);

CREATE POLICY "Secure user data update" 
ON public."User's" 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);

CREATE POLICY "Secure user data insert" 
ON public."User's" 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  "Email" = auth.email()
);