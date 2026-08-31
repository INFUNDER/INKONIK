-- Run this entire script in the Supabase SQL Editor

-- 1. Create the Contact Submissions (Leads) table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    message TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a contact form submission (Public access for inserting)
CREATE POLICY "Allow public inserts on contact_submissions" 
ON public.contact_submissions FOR INSERT 
TO public 
WITH CHECK (true);

-- Only authenticated users (admins) can view the submissions
CREATE POLICY "Allow auth users to view contact_submissions" 
ON public.contact_submissions FOR SELECT 
TO authenticated 
USING (true);


-- 2. Create the Client Projects table
CREATE TABLE IF NOT EXISTS public.client_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    project_name TEXT NOT NULL,
    status TEXT NOT NULL, -- e.g., 'In Progress', 'Completed'
    last_update TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- Users can only view their OWN projects
CREATE POLICY "Users can view their own projects" 
ON public.client_projects FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Only service role (admin backend) can insert/update for now
-- (We will insert dummy data manually below)

-- 3. (Optional) Insert some dummy project data for testing if you have a user
-- Note: You would replace 'YOUR_USER_ID_HERE' with an actual user ID from the auth.users table
-- INSERT INTO public.client_projects (user_id, project_name, status, last_update)
-- VALUES ('YOUR_USER_ID_HERE', 'SEO Optimization Q3', 'In Progress', 'Keyword research completed.');
