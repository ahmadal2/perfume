-- ============================================
-- FIX INFINITE RECURSION ERROR
-- Run this in Supabase SQL Editor immediately
-- ============================================

-- 1. Create a secure function to check admin status without triggering RLS
-- SECURITY DEFINER means this function runs with the privileges of the database owner,
-- bypassing the RLS recursion loop on the 'users' table.
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$ 
BEGIN 
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'owner')
  ); 
END; 
$$;

-- 2. Drop the broken recursive policy
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

-- 3. Create the new fixed policy using the secure function
-- Also adding a fallback for the specific admin email to be 100% sure
CREATE POLICY "Admins can view all users" ON public.users 
FOR SELECT USING (
    is_admin() 
    OR 
    auth.jwt() ->> 'email' = 'ahmed.aa.ss748@gmail.com'
);

-- 4. Ensure the same for UPDATE permissions
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users" ON public.users 
FOR UPDATE USING (
    is_admin() 
    OR 
    auth.jwt() ->> 'email' = 'ahmed.aa.ss748@gmail.com'
);

-- 5. Final safety check: Ensure your user row is definitely an owner
UPDATE public.users 
SET role = 'owner' 
WHERE email = 'ahmed.aa.ss748@gmail.com';
