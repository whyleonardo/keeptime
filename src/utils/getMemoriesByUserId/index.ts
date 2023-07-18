import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'

interface GetMemoriesByUserIdProps {
	(
		userId: string,
		columnOrder?: 'created_at' | 'title',
		ascending?: boolean
	): Promise<Memory[] | null>
}

export const preload: (
	userId: string,
	columnOrder?: 'created_at' | 'title',
	ascending?: boolean
) => void = (userId, columnOrder, ascending) => {
	void getMemoriesByUserId(userId, columnOrder, ascending)
}

export const getMemoriesByUserId: GetMemoriesByUserIdProps = cache(
	async (userId: string, columnOrder = 'created_at', ascending = false) => {
		const memories = (
			await supabase
				.from('memories')
				.select('*')
				.eq('user_id', userId)
				.order(columnOrder, { ascending })
		).data

		return memories
	}
)
