import { Metadata } from 'next'

import { MemoryCard } from '@/components/Cards/MemoryCard'

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

	return (
		<div className="mt-6 flex flex-wrap justify-center gap-2 rounded-md border p-6">
			{memories &&
				memories.map((memory) => (
					<MemoryCard
						key={memory.id}
						memory={memory}
						targetProfile={targetProfile}
					/>
				))}
		</div>
	)
}
