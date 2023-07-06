import { Metadata } from 'next'

import { MemoryCard } from '@/components/Cards/MemoryCard'
import { CreateMemorySheet } from '@/components/Sheets/CreateMemorySheet'

import { sbServer as supabase } from '@/services/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
	title: 'My Memories',
	description: 'Manage your memories.'
}

export default async function MyMemoriesPage() {
	const user = (await supabase.auth.getUser()).data.user

	const memories = (
		await supabase
			.from('memories')
			.select('*')
			.eq('user_id', user?.id)
			.order('created_at', { ascending: false })
	).data

	const mediaPath = (path: string) => {
		const { data: media } = supabase.storage.from('medias').getPublicUrl(path)
		return media
	}

	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">My Memories</h1>
			{/* className="relative mb-32 mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md p-6 md:mb-0 md:border" */}

			<div className="mb-32 mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,320px))] justify-center gap-6 rounded-md p-6 md:mb-0 md:border">
				{memories?.length ? (
					memories.map((memory) => (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore - React Server Component
						<MemoryCard
							key={memory.id}
							mediaPath={mediaPath}
							memory={memory}
							isAspectSquare
							isExcerpt
						/>
					))
				) : (
					<p className="text-muted-foreground text-xl">
						You not created memories yet.
					</p>
				)}
				<CreateMemorySheet />
			</div>
		</>
	)
}
