'use server'

import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'

interface GetMemoriesProps {
	(
		columnOrder?: 'created_at' | 'title',
		ascending?: boolean,
		from?: number
	): Promise<Memory[] | null>
}

export const preload: (
	columnOrder?: 'created_at' | 'title',
	ascending?: boolean
) => void = (columnOrder = 'created_at', ascending = false, from = 20) => {
	void getMemories(columnOrder, ascending, from)
}

export const getMemories: GetMemoriesProps = cache(
	async (columnOrder = 'created_at', ascending = false, from = 20) => {
		const memories = (
			await supabase
				.from('memories')
				.select('*')
				.order(columnOrder, { ascending })
				.range(0, from)
		).data

		return memories
	}
)
