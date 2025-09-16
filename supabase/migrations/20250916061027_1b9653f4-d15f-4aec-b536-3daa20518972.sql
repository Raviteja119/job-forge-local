-- Fix search path for the existing function
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add RLS policies for existing tables

-- Available jobs table policies
CREATE POLICY "Users can view all available jobs" 
ON public."Available jobs" 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create job availability" 
ON public."Available jobs" 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::bigint = user_id);

-- Post a Job table policies
CREATE POLICY "Users can view all job posts" 
ON public."Post a Job" 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Companies can create job posts" 
ON public."Post a Job" 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Companies can update their job posts" 
ON public."Post a Job" 
FOR UPDATE 
TO authenticated
USING (true);

-- Profile table policies (legacy table)
CREATE POLICY "Users can view profiles" 
ON public."Profile" 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile legacy" 
ON public."Profile" 
FOR UPDATE 
TO authenticated
USING (auth.uid()::bigint = user_id);

CREATE POLICY "Users can insert their profile legacy" 
ON public."Profile" 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid()::bigint = user_id);

-- User table policies (legacy table)
CREATE POLICY "Users can view user info" 
ON public."User" 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can update their own user info" 
ON public."User" 
FOR UPDATE 
TO authenticated
USING (auth.uid()::bigint = user_id);

-- Category table policies (public data)
CREATE POLICY "Anyone can view categories" 
ON public.category 
FOR SELECT 
TO authenticated
USING (true);

-- Company table policies (public data)
CREATE POLICY "Anyone can view companies" 
ON public.company 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create companies" 
ON public.company 
FOR INSERT 
TO authenticated
WITH CHECK (true);