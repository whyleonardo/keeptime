'use client'

import { useRouter } from 'next/navigation'

import { sbClient as supabase } from '@/services/supabase/client'

export const SignOutButton = () => {
	const router = useRouter()
	const handleLogout = async () => {
		await supabase.auth.signOut()

		router.refresh()
	}
	return <button onClick={handleLogout}>Sign Out</button>
}
