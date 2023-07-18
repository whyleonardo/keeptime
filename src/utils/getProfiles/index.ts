'use server'

import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'

export const preload = () => {
	void getProfiles()
}

export const getProfiles = cache(async () => {
	const profiles = (await supabase.from('profiles').select('*')).data
	return profiles
})
