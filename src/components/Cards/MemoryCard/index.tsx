import Image from 'next/image'
import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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

import { getUserSubscriptionPlan } from '@/services/stripe/subscription'
import { sbServer as supabase } from '@/services/supabase/server'
import { Memory } from '@/types/memory'
import { dateFormat } from '@/utils/dateFormat'

interface MemoryCardProps {
	memory: Memory
	mediaPath: (path: string) => {
		publicUrl: string
	}
}

export const MemoryCard = async ({ memory, mediaPath }: MemoryCardProps) => {
	const { publicUrl } = mediaPath(memory?.media_path as string)

	const mediaType = publicUrl.includes('image') ? 'image' : 'video'

	const user = (
		await supabase
			.from('profiles')
			.select('*')
			.eq('id', memory.user_id)
			.single()
	).data

	const { isPro } = await getUserSubscriptionPlan(user?.id as string)

	return (
		<Card className="flex h-full w-full flex-col items-center overflow-hidden last:pb-20">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{memory.title}
					{!memory.is_public && (
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
					<span className="mb-2 self-center text-muted-foreground">
						{dateFormat(new Date(memory.created_at))}
					</span>
					{mediaType == 'image' ? (
						<Image
							src={publicUrl}
							width={480}
							height={360}
							alt=""
							className="aspect-auto w-full rounded"
						/>
					) : (
						<video src={publicUrl} controls className="aspect-video" />
					)}

					<Link
						href={`/dashboard/profile/${user?.username}`}
						className="group ml-2 mt-2 flex items-center gap-1 self-start "
					>
						<Avatar className="h-5 w-5">
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
							{/* @ts-ignore */}
							<AvatarImage src={user?.avatar_url} />
							<AvatarFallback>
								{user?.full_name?.at(0)?.toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex items-center gap-1 font-semibold text-muted-foreground transition-colors group-hover:text-muted-foreground/80">
							<span>{user?.username || user?.full_name}</span>
							{isPro && (
								<Badge variant="pro">
									<span>Pro</span>
									<Icons.star className="h-[0.60rem] w-[0.60rem] fill-muted-foreground" />
								</Badge>
							)}
						</div>
					</Link>
				</div>

				<CardDescription className="m-2 max-w-full self-start whitespace-pre-wrap">
					{memory.description && memory.description?.length > 240
						? memory?.description?.trimEnd().substring(0, 115).concat('...')
						: memory?.description}
				</CardDescription>
			</CardContent>
		</Card>
	)
}
