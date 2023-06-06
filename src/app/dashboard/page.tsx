import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { sbServer as supabase } from '@/services/supabase/server'

export const revalidate = 60

export default async function DashboardPage() {
	const memories = (await supabase.from('memories').select('*')).data

	const profiles = (await supabase.from('profiles').select('*')).data

	const targetProfile = (memory: { user_id: string }) =>
		profiles &&
		profiles.find((profile) => profile.id === memory.user_id && profile)

	return (
		<div className="flex gap-2">
			{memories &&
				memories.map((memory) => (
					<div key={memory.id}>
						<h2>{memory.title}</h2>
						<div className="flex items-center gap-1 border">
							<p>{targetProfile(memory)?.full_name}</p>

							<Avatar className="h-6 w-6">
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
								{/* @ts-ignore */}
								<AvatarImage src={targetProfile(memory)?.avatar_url} />
								<AvatarFallback>
									{targetProfile(memory)?.full_name?.at(0)?.toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</div>
						<p>{memory.description}</p>
					</div>
				))}
		</div>
	)
}
