import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ProBadge } from '@/components/Badges/ProBadge'
import { Icons } from '@/components/Icons'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'

import { sbServer as supabase } from '@/services/supabase/server'
import { dateFormat } from '@/utils/dateFormat'
import { getAvatarPath } from '@/utils/getAvatarPath'
import { getMedia } from '@/utils/getMedia'

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

	if (!profile) {
		return null
	}

	const memories = (
		await supabase
			.from('memories')
			.select('*')
			.eq('user_id', profile?.id)
			.order('created_at', { ascending: false })
	).data

	const website =
		profile.website && profile.website.replace(/(https?:\/\/)/, '')

	const profileAvatar = getAvatarPath(profile.avatar_url)

	return (
		<div className="mb-32 grid grid-rows-[12rem_1fr] gap-12 overflow-hidden rounded-md border pb-6 md:mb-0 ">
			<div className="bg-muted relative w-full">
				<Avatar className="border-background absolute -bottom-10 left-6 h-32 w-32 border-4">
					{profileAvatar && <AvatarImage src={profileAvatar} />}
					<AvatarFallback className="text-5xl">
						{profile?.full_name?.at(0)?.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>

			<div className="relative w-full gap-8 px-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<span className="flex items-center gap-1">
							<strong className="text-xl leading-none">
								{profile.full_name}
							</strong>
							{/* @ts-expect-error Async Server Component */}
							<ProBadge id={profile.id} />
						</span>
						<span className="text-muted-foreground leading-tight">
							@{profile.username}
						</span>

						<div className="mt-2">
							{profile.bio && (
								<div className="mb-2 w-full md:w-2/4">{profile.bio}</div>
							)}

							<span className="text-muted-foreground flex items-center gap-1 text-sm">
								<Icons.date className="h-4 w-4" />
								Sharing his moments since{' '}
								{dateFormat(new Date(profile.created_at as string), true)}
							</span>

							{website && (
								<a
									href={website}
									className={buttonVariants({
										variant: 'link',
										size: 'link',
										className: 'leading-none'
									})}
								>
									<span className="flex items-center gap-1">
										<Icons.link className="text-muted-foreground h-4 w-4" />
										{website}
									</span>
								</a>
							)}
						</div>
					</div>

					<div className="relative mt-4  rounded-md border p-6">
						<strong className="bg-background absolute -top-3 left-4 px-2 text-lg">
							Memories
						</strong>

						<div className="flex flex-wrap justify-center gap-4 md:justify-normal">
							{memories?.length ? (
								memories.map((memory) => (
									<Link href={`/memory/${memory.id}`} key={memory.id}>
										<Card className="hover:bg-muted/50 group w-fit space-y-2 pt-4 transition-colors">
											<CardHeader className="flex flex-col items-center">
												<CardTitle>{memory.title}</CardTitle>

												<span className="text-muted-foreground text-sm">
													{dateFormat(new Date(memory.created_at as string))}
												</span>
											</CardHeader>
											<CardContent>
												<Image
													alt=""
													width={240}
													height={240}
													src={getMedia(memory.media_path as string).publicUrl}
													className="aspect-square rounded"
												/>
											</CardContent>
										</Card>
									</Link>
								))
							) : (
								<span className="text-muted-foreground text-center">
									This user has no memories.
								</span>
							)}
						</div>
					</div>

					<div className="relative mt-4 rounded-md border p-6">
						<strong className="bg-background absolute -top-3 left-4 px-2 text-lg">
							Albums
						</strong>

						<span className="text-muted-foreground text-center">
							This user has no albums.
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
