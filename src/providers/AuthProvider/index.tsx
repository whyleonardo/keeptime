'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { sbClient as supabase } from '@/services/supabase/client'

interface AuthProviderProps {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter()

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			//refresh data
			router.refresh()
		})

		return () => subscription?.unsubscribe()
	}, [supabase, router])

	return <>{children}</>
}
