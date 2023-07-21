'use server'

import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'

interface GetMemoriesProps {
	(
		from?: number,
		to?: number,
		columnOrder?: 'created_at' | 'title',
		ascending?: boolean
	): Promise<Memory[] | null>
}

export const preload: (
	columnOrder?: 'created_at' | 'title',
	ascending?: boolean
) => void = (
	columnOrder = 'created_at',
	ascending = false,
	to = 0,
	from = 20
) => {
	void getMemories(to, from, columnOrder, ascending)
}

export const getMemories: GetMemoriesProps = cache(
	async (to = 0, from = 20, columnOrder = 'created_at', ascending = false) => {
		const memories = (
			await supabase
				.from('memories')
				.select('*')
				.order(columnOrder, { ascending })
				.range(to, from)
		).data

		return memories
	}
)
