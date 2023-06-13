import Image from 'next/image'
import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { Memory } from '@/types/memory'
import { Profile } from '@/types/profile'
import { dateFormat } from '@/utils/dateFormat'

interface MemoryCardProps {
	memory: Memory
	targetProfile: (string: { user_id: string }) => Profile
}

export const MemoryCard = ({ memory, targetProfile }: MemoryCardProps) => {
	return (
		<Card className="flex h-full w-full flex-col items-center overflow-hidden lg:w-5/6">
			<CardHeader>
				<CardTitle>{memory.title}</CardTitle>
				{/*  */}
			</CardHeader>

			<CardContent className="flex w-full flex-col items-center lg:w-3/4">
				<div className="flex w-full flex-col items-center">
					<span className="text-muted-foreground mb-2 self-center">
						{dateFormat(new Date(memory.created_at))}
					</span>

					<div className="relative h-[28rem] w-full rounded-md bg-gradient-to-br from-purple-500 via-red-500 to-orange-500">
						<button className="absolute right-4 top-4 transition-transform hover:scale-125">
							<Icons.more />
						</button>
					</div>
					<Link
						href={`/dashboard/profile/${targetProfile(memory)?.username}`}
						className="group ml-2 mt-2 flex items-center gap-1 self-start "
					>
						<Avatar className="h-5 w-5">
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
							{/* @ts-ignore */}
							<AvatarImage src={targetProfile(memory)?.avatar_url} />
							<AvatarFallback>
								{targetProfile(memory)?.full_name?.at(0)?.toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<span className="text-muted-foreground group-hover:text-muted-foreground/80 font-semibold transition-colors">
							{targetProfile(memory)?.username ||
								targetProfile(memory)?.full_name}
						</span>
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
