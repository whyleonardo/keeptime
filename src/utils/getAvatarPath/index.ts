import { sbClient as supabase } from '@/services/supabase/client'

export function getAvatarPath(path: string | null) {
	if (!path) {
		return null
	}

	if (path.startsWith('avatars/')) {
		const {
			data: { publicUrl }
		} = supabase.storage.from('medias').getPublicUrl(path)

		return publicUrl
	}

	return path
}
