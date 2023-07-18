import { Database } from './supabase'

export type Memory = Database['public']['Tables']['memories']['Row']
