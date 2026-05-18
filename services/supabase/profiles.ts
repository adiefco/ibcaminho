import { supabase } from './client'

export async function fetchMyProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, phone')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.log('PROFILE FETCH ERROR:', error)
    return null
  }

  return data
}