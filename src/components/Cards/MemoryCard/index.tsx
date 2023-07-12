import Image from 'next/image'
import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'

import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'
import { dateFormat } from '@/utils/dateFormat'
import { getAvatarPath } from '@/utils/getAvatarPath'
import { getMedia } from '@/utils/getMedia'
import clsx from 'clsx'

interface MemoryCardProps {
	memory: Memory
	isAspectSquare?: boolean
	isExcerpt?: boolean
}

export const MemoryCard = async ({
	memory,
	isAspectSquare,
	isExcerpt
}: MemoryCardProps) => {
	const { media_path, created_at, description, is_public, title, user_id } =
		memory

	if (!memory) return null

	const { publicUrl } = getMedia(media_path as string)
	const mediaType = publicUrl.includes('image') ? 'image' : 'video'

	const user = (
		await supabase.from('profiles').select('*').eq('id', user_id).single()
	).data

	if (!user) return null

	const userAvatar = getAvatarPath(user.avatar_url)

	return (
		<Card className="flex h-full w-full flex-col items-center overflow-hidden last:pb-20">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{title}
					{!is_public && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Icons.lock className="h-4 w-4 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>This memory is not public</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</CardTitle>
			</CardHeader>

			<CardContent className="flex w-full flex-col items-center lg:w-3/4">
				<div className="flex w-full flex-col items-center">
					<span className="mb-2 self-center text-sm text-muted-foreground">
						{dateFormat(new Date(created_at))}
					</span>
					{mediaType == 'image' ? (
						<Image
							priority
							src={publicUrl}
							width={480}
							height={360}
							alt=""
							className={clsx(
								'aspect-auto w-full rounded',
								isAspectSquare && 'aspect-square'
							)}
						/>
					) : (
						<video src={publicUrl} controls className="aspect-video" />
					)}

					<Link
						href={`/dashboard/profile/${user?.username}`}
						className="group ml-2 mt-2 flex items-center gap-1 self-start "
					>
						<Avatar className="h-5 w-5">
							{userAvatar && <AvatarImage src={userAvatar} />}
							<AvatarFallback>
								{user?.full_name?.at(0)?.toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex items-center gap-1 font-semibold text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
							<span>{user?.username || user?.full_name}</span>
						</div>
					</Link>
				</div>

				<CardDescription className="m-2 max-w-full self-start whitespace-pre-wrap">
					{isExcerpt
						? description && description?.length > 50
							? description.substring(0, 50).concat('...')
							: description
						: description && description?.length > 240
						? description?.trimEnd().substring(0, 115).concat('...')
						: description}
				</CardDescription>
			</CardContent>
		</Card>
	)
}
