import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'

export const preload = (username: string) => {
	void getProfileByUsername(username)
}

export const getProfileByUsername = cache(async (username: string) => {
	const profile = (
		await supabase
			.from('profiles')
			.select('*')
			.eq('username', username)
			.single()
	).data
	return profile
})
