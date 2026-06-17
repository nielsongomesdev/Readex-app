import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function signInWithProvider(provider: 'google' | 'apple') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin + '/auth-callback' },
  })

  if (error) throw error
  
  if (data?.url) window.location.href = data.url
}

export async function getSessionFromUrl() {
  
  
  
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}