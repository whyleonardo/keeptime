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

	const profiles = (await supabase.from('profiles').select('*')).data

	const targetProfile = (memory: { user_id: string }) =>
		profiles &&
		profiles.find((profile) => profile.id === memory.user_id && profile)

	const mediaPath = (path: string) => {
		const { data: media } = supabase.storage.from('medias').getPublicUrl(path)
		return media
	}

	return (
		<>
			<div className="relative mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md border p-6">
				{memories &&
					memories.map((memory) => (
						<MemoryCard
							key={memory.id}
							mediaPath={mediaPath}
							memory={memory}
							targetProfile={targetProfile}
						/>
					))}

				<CreateMemorySheet />
			</div>
		</>
	)
}
