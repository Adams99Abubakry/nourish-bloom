-- Add location preference columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_latitude DOUBLE PRECISION DEFAULT NULL,
ADD COLUMN IF NOT EXISTS preferred_longitude DOUBLE PRECISION DEFAULT NULL,
ADD COLUMN IF NOT EXISTS preferred_city TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS preferred_country TEXT DEFAULT NULL;

-- Update the specific user's location to United Kingdom (London coordinates)
UPDATE public.profiles
SET 
  preferred_latitude = 51.5074,
  preferred_longitude = -0.1278,
  preferred_city = 'London',
  preferred_country = 'United Kingdom'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'adamsabubakr74@gmail.com'
);