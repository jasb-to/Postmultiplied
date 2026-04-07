import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'agency';
  credits_used: number;
  credits_limit: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  created_at: string;
}

// Get user by ID
export async function getUser(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

// Create user if not exists (called on Clerk sign-up)
export async function createUserIfNotExists(userId: string, email: string): Promise<User> {
  const existing = await getUser(userId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      email,
      plan: 'free',
      credits_limit: 3,
      credits_used: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
}

// Check if user has credits available
export async function checkCreditsAvailable(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  if (!user) return false;

  // Reset credits if period has ended for paid plans
  if (user.plan !== 'free' && user.current_period_end) {
    const periodEnd = new Date(user.current_period_end);
    if (new Date() > periodEnd) {
      await supabase
        .from('users')
        .update({ credits_used: 0 })
        .eq('id', userId);
      user.credits_used = 0;
    }
  }

  return user.credits_used < user.credits_limit;
}

// Increment credits used
export async function incrementCreditsUsed(userId: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ credits_used: supabase.rpc('increment_credits', { user_id: userId }) })
    .eq('id', userId);

  if (error) {
    console.error('Error incrementing credits:', error);
    throw error;
  }
}

// Save post
export async function savePost(
  userId: string,
  input: string,
  outputs: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  }
): Promise<string> {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      input_text: input,
      linkedin: outputs.linkedin || null,
      twitter: outputs.twitter || null,
      instagram: outputs.instagram || null,
      tiktok: outputs.tiktok || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving post:', error);
    throw error;
  }

  return data.id;
}

// Add post to public gallery
export async function addToPublicGallery(userId: string, postId: string): Promise<void> {
  const { error } = await supabase
    .from('public_gallery')
    .insert({
      post_id: postId,
      user_id: userId,
    });

  if (error) {
    console.error('Error adding to gallery:', error);
    throw error;
  }
}

// Get user's posts
export async function getUserPosts(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data;
}

// Get public gallery
export async function getPublicGallery(limit = 50) {
  const { data, error } = await supabase
    .from('public_gallery')
    .select('*, posts(*)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }

  return data;
}

// Update user plan and credits after Stripe purchase
export async function updateUserPlan(
  userId: string,
  plan: 'free' | 'pro' | 'agency',
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  periodEnd: Date
): Promise<void> {
  const creditsLimit = plan === 'pro' ? 50 : plan === 'agency' ? 150 : 3;

  const { error } = await supabase
    .from('users')
    .update({
      plan,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      current_period_end: periodEnd.toISOString(),
      credits_limit: creditsLimit,
      credits_used: 0,
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user plan:', error);
    throw error;
  }
}
