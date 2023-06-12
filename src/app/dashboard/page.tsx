import { Metadata } from 'next'

import { MemoryCard } from '@/components/Cards/MemoryCard'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

import { sbServer as supabase } from '@/services/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Manage your memories.'
}

export default async function DashboardPage() {
	const memories = (await supabase.from('memories').select('*')).data

	const profiles = (await supabase.from('profiles').select('*')).data

	const targetProfile = (memory: { user_id: string }) =>
		profiles &&
		profiles.find((profile) => profile.id === memory.user_id && profile)

	const memoriesSortedByDate =
		memories &&
		memories.sort((a, b) => {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return dateB.getTime() - dateA.getTime()
		})

	return (
		<>
			<div className="relative mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md border p-6">
				{memoriesSortedByDate &&
					memoriesSortedByDate.map((memory) => (
						<MemoryCard
							key={memory.id}
							memory={memory}
							targetProfile={targetProfile}
						/>
					))}

				<Button
					variant="default"
					className="fixed bottom-4 right-[3.225rem] flex max-w-fit items-center gap-2"
				>
					<Icons.plus />
					<span className="hidden lg:inline-block">Create Memory</span>
				</Button>
			</div>
		</>
	)
}
