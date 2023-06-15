import Image from 'next/image'
import Link from 'next/link'

import { Icons } from '@/components/Icons'

import { sbServer as supabase } from '@/services/supabase/server'
import { dateFormat } from '@/utils/dateFormat'

interface ProfilePageProps {
	params: {
		username: string
	}
}

export default async function ProfilePage({
	params: { username }
}: ProfilePageProps) {
	const { data } = await supabase
		.from('profiles')
		.select()
		.eq('username', username)
		.single()

	return (
		<div className="mt-4 flex h-auto w-full flex-col items-center rounded border p-4 lg:flex-row">
			<Image
				alt=""
				className="h-56 w-56 rounded-full lg:h-64 lg:w-64"
				src={data?.avatar_url || ''}
				width={250}
				height={250}
			/>

			<div className="mt-4 flex flex-col flex-wrap justify-center gap-4 text-lg font-bold lg:flex-row">
				<span className="flex max-w-fit grow items-center gap-1">
					<span className="flex items-center gap-1 text-muted-foreground">
						<Icons.user /> Name:
					</span>
					{data?.full_name}
				</span>

				<span className="flex max-w-fit grow items-center gap-1">
					<span className="flex items-center gap-1 text-muted-foreground">
						<Icons.mail /> Email:
					</span>
					{data?.email}
				</span>

				<span className="flex max-w-fit grow items-center gap-1">
					<span className="flex items-center gap-1 text-muted-foreground">
						<Icons.website />
						Website:
					</span>
					<Link
						className="cursor-pointer transition-colors hover:text-foreground hover:underline"
						href={data?.website as string}
					>
						{data?.website}
					</Link>
				</span>

				<span className="flex max-w-fit grow items-center gap-1">
					<span className="flex items-center gap-1 text-muted-foreground">
						<Icons.date />
						Created at:
					</span>
					{dateFormat(new Date(data?.created_at as string))}
				</span>
			</div>
		</div>
	)
}
