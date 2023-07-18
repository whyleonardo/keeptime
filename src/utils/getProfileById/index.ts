import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'

export const preload = (id: string) => {
	void getProfileById(id)
}

export const getProfileById = cache(async (id: string) => {
	const profile = (
		await supabase.from('profiles').select('*').eq('id', id).single()
	).data

	return profile
})
