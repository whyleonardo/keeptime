import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'

export const preload = (path: string) => {
	void getMedia(path)
}

export const getMedia = cache((path: string) => {
	const { data: media } = supabase.storage.from('medias').getPublicUrl(path)
	return media
})
