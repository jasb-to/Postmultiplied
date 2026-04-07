-- Create users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'agency')),
  credits_remaining INT DEFAULT 3,
  credits_total INT DEFAULT 3,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_credits table for tracking usage
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table for user-generated content
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'instagram', 'tiktok', 'facebook')),
  original_text TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  variations JSONB DEFAULT '[]',
  tone TEXT,
  length TEXT,
  hashtags TEXT,
  emojis BOOLEAN DEFAULT false,
  cta BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  likes INT DEFAULT 0,
  views INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create public_gallery table for showcasing best posts
CREATE TABLE IF NOT EXISTS public_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  featured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  feature_order INT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_is_public ON posts(is_public);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_gallery_featured_at ON public_gallery(featured_at);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_credits table
CREATE POLICY "Users can view their own credits" ON user_credits
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for posts table
CREATE POLICY "Users can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public posts" ON posts
  FOR SELECT USING (is_public = true);

-- RLS Policies for public_gallery table
CREATE POLICY "Anyone can view gallery" ON public_gallery
  FOR SELECT USING (true);
