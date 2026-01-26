-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  quran_last_surah INTEGER DEFAULT 1,
  quran_last_ayah INTEGER DEFAULT 1,
  dhikr_streak INTEGER DEFAULT 0,
  last_dhikr_date DATE,
  preferred_reciter TEXT DEFAULT 'ar.alafasy',
  preferred_translation TEXT DEFAULT 'en.sahih',
  dark_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create bookmarks table for Quran bookmarks
CREATE TABLE public.quran_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, surah_number, ayah_number)
);

-- Enable RLS on bookmarks
ALTER TABLE public.quran_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks" 
ON public.quran_bookmarks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" 
ON public.quran_bookmarks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
ON public.quran_bookmarks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create ramadan_goals table
CREATE TABLE public.ramadan_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  fasted BOOLEAN DEFAULT false,
  prayed_fajr BOOLEAN DEFAULT false,
  prayed_dhuhr BOOLEAN DEFAULT false,
  prayed_asr BOOLEAN DEFAULT false,
  prayed_maghrib BOOLEAN DEFAULT false,
  prayed_isha BOOLEAN DEFAULT false,
  read_quran BOOLEAN DEFAULT false,
  quran_pages INTEGER DEFAULT 0,
  gave_charity BOOLEAN DEFAULT false,
  charity_amount DECIMAL(10,2) DEFAULT 0,
  dhikr_count INTEGER DEFAULT 0,
  journal_entry TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, goal_date)
);

-- Enable RLS on ramadan_goals
ALTER TABLE public.ramadan_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goals" 
ON public.ramadan_goals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals" 
ON public.ramadan_goals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
ON public.ramadan_goals 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();