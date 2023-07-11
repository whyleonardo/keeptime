import { Metadata } from 'next'

import { MemoryCard } from '@/components/Cards/MemoryCard'
import { CreateMemorySheet } from '@/components/Sheets/CreateMemorySheet'

import { sbServer as supabase } from '@/services/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Manage your memories.'
}

export default async function DashboardPage() {
	const memories = (
		await supabase
			.from('memories')
			.select('*')
			.order('created_at', { ascending: false })
	).data

	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">Home</h1>

			<div className="relative mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md py-6 md:mb-0 md:border md:px-6">
				{memories?.length ? (
					memories.map((memory) => (
						//@ts-expect-error Async Server Component
						<MemoryCard key={memory.id} memory={memory} />
					))
				) : (
					<p className="text-muted-foreground text-xl">No memories yet.</p>
				)}

				<CreateMemorySheet />
			</div>
		</>
	)
}
