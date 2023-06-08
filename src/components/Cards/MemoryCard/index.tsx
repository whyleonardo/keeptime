import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
		<Card className="flex h-full w-full flex-col items-center overflow-hidden lg:w-4/6">
			<CardHeader>
				<CardTitle className="text-center">{memory.title}</CardTitle>
			</CardHeader>

			<CardContent className="flex w-full flex-col items-center lg:w-3/4">
				<div className="flex w-full flex-col items-center">
					<div className="mb-2 flex w-full justify-between px-4">
						<div className="flex items-center gap-1">
							<Avatar className="h-5 w-5">
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
								{/* @ts-ignore */}
								<AvatarImage src={targetProfile(memory)?.avatar_url} />
								<AvatarFallback>
									{targetProfile(memory)?.full_name?.at(0)?.toUpperCase()}
								</AvatarFallback>
							</Avatar>

							<span className="text-muted-foreground">
								{targetProfile(memory)?.username ||
									targetProfile(memory)?.full_name}
							</span>
						</div>

						<span className="text-muted-foreground">
							{dateFormat(new Date(memory.created_at))}
						</span>
					</div>

					<div className="h-[28rem] w-[28rem] max-w-[100%] rounded-md border border-dashed"></div>
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
