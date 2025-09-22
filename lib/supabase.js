import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for database operations
export const getDailyDonations = async (limit = 10) => {
  const { data, error } = await supabase
    .from('daily_donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  return { data, error }
}

export const getSuccessStories = async () => {
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const createDonationRecord = async (donationData) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([donationData])

  return { data, error }
}