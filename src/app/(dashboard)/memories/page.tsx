import { Metadata } from 'next'

import { MemoryCard } from '@/components/Cards/MemoryCard'
import { MemoriesTimeline } from '@/components/MemoriesTimeline'
import { CreateMemorySheet } from '@/components/Sheets/CreateMemorySheet'

import { getAuthUser } from '@/utils/getAuthUser'
import { getMemoriesByUserId } from '@/utils/getMemoriesByUserId'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Manage your memories.'
}

export default async function DashboardPage() {
	const user = await getAuthUser()

	if (!user) {
		return null
	}

	const memories = await getMemoriesByUserId(user?.id)
	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">Home</h1>

			<MemoriesTimeline>
				{memories?.length ? (
					memories.map((memory) => (
						//@ts-expect-error Async Server Component
						<MemoryCard key={memory.id} memory={memory} />
					))
				) : (
					<p className="text-muted-foreground text-xl">No memories yet.</p>
				)}

				<CreateMemorySheet />
			</MemoriesTimeline>
		</>
	)
}
