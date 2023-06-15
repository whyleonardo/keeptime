'use client'

import { useState } from 'react'

import { Icons } from '@/components/Icons'

import { cn } from '@/lib/utils'
import { sbClient as supabase } from '@/services/supabase/client'

export const LikeMemory = ({ memoryId }: { memoryId: string }) => {
	const [liked, setLiked] = useState(false)

	const memoryLikesCount = supabase
		.from('memories')
		.select('likes')
		.eq('id', memoryId)
		.single()
		.then((res) => res.data?.likes as number)

	async function handleLikeMemory() {
		if (liked) {
			supabase
				.from('memories')
				.update({
					likes: (await memoryLikesCount) - 1
				})
				.eq('id', memoryId)

			setLiked(!liked)
		} else {
			supabase
				.from('memories')
				.update({
					likes: (await memoryLikesCount) + 1
				})
				.eq('id', memoryId)
		}

		setLiked(!liked)
	}

	return (
		<button onClick={handleLikeMemory}>
			<Icons.heart
				className={cn(
					liked && 'fill-red-500 text-red-500',
					'transition-colors',
					'hover:text-muted-foreground'
				)}
			/>
		</button>
	)
}
