import { cache } from 'react'

import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'

interface GetMemoriesProps {
	(columnOrder?: 'created_at' | 'title', ascending?: boolean): Promise<
		Memory[] | null
	>
}

export const preload: (
	columnOrder?: 'created_at' | 'title',
	ascending?: boolean
) => void = (columnOrder = 'created_at', ascending = false) => {
	void getMemories(columnOrder, ascending)
}

export const getMemories: GetMemoriesProps = cache(
	async (columnOrder = 'created_at', ascending = false) => {
		const memories = (
			await supabase
				.from('memories')
				.select('*')
				.order(columnOrder, { ascending })
		).data

		return memories
	}
)
