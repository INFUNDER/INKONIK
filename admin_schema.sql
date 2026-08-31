-- Run this script in the Supabase SQL Editor

-- 1. Create a profiles table to track roles (like 'admin')
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    is_admin BOOLEAN DEFAULT false
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);



-- 2. Function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (
    NEW.id, 
    NEW.email, 
    -- Automatically make this specific email the admin
    CASE WHEN NEW.email = 'inkonik.marketing@gmail.com' THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Update existing tables to allow Admins full access

-- Update contact_submissions policies
DROP POLICY IF EXISTS "Allow auth users to view contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow admins to view contact_submissions" 
ON public.contact_submissions FOR SELECT 
TO authenticated 
USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- Update client_projects policies
CREATE POLICY "Admins can view all projects" 
ON public.client_projects FOR SELECT 
TO authenticated 
USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Admins can insert projects" 
ON public.client_projects FOR INSERT 
TO authenticated 
WITH CHECK (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Admins can update projects" 
ON public.client_projects FOR UPDATE 
TO authenticated 
USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 4. Retroactively create profiles for any users that already exist in auth.users
INSERT INTO public.profiles (id, email, is_admin)
SELECT id, email, CASE WHEN email = 'inkonik.marketing@gmail.com' THEN true ELSE false END
FROM auth.users
ON CONFLICT (id) DO NOTHING;
