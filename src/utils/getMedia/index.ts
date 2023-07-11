import { sbServer as supabase } from '@/services/supabase/server'

export function getMedia(path: string) {
	const { data: media } = supabase.storage.from('medias').getPublicUrl(path)
	return media
}
