import { Metadata } from 'next'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { sbServer as supabase } from '@/services/supabase/server'

interface ProfilePageProps {
	params: {
		username: string
	}
}

export const metadata: Metadata = {
	title: 'Profile'
}

export default async function ProfilePage({
	params: { username }
}: ProfilePageProps) {
	const profile = (
		await supabase
			.from('profiles')
			.select('*')
			.eq('username', username)
			.single()
	).data

	if (!profile) return null

	const memories = (
		await supabase.from('memories').select('*').eq('user_id', profile?.id)
	).data

	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">{username}</h1>
			{/* className="relative mb-32 mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md p-6 md:mb-0 md:border" */}

			<div className="mb-32 mt-6 rounded-md p-6 md:mb-0 md:border">
				<Avatar className="h-5 w-5">
					{profile?.avatar_url && <AvatarImage src={profile?.avatar_url} />}
					<AvatarFallback>{profile?.full_name || username}</AvatarFallback>
				</Avatar>

				<span>
					{memories?.length
						? `This user has ${memories?.length} memories`
						: 'This user has no memories'}
				</span>
			</div>
		</>
	)
}
