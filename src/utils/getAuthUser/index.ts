import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'

export const getAuthUser = cache(async () => {
	const user = (await supabase.auth.getUser()).data.user

	return user
})
