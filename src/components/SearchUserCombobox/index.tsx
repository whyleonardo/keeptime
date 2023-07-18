'use client'

import Link from 'next/link'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { Profile } from '@/types/profile'
import { getAvatarPath } from '@/utils/getAvatarPath'
import { Search } from 'lucide-react'

interface SearchUserComboboxProps {
	profiles: Profile[] | null
}

export const SearchUserCombobox = ({ profiles }: SearchUserComboboxProps) => {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState('')

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn('w-80 justify-between hidden md:inline-flex')}
				>
					{value
						? profiles &&
						  profiles.find((profile) => profile.username === value)?.username
						: 'Search an user...'}
					<Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn('ml-2 w-80 p-0')}>
				<Command>
					<CommandInput placeholder="Search user..." />
					<CommandEmpty>No user found.</CommandEmpty>
					<CommandGroup>
						{profiles &&
							profiles.map((profile, index) => (
								<div className="relative" key={profile.id}>
									<Avatar className="absolute left-2 top-[50%] z-[99999] h-7 w-7 -translate-y-1/2">
										{profile.avatar_url && (
											<AvatarImage
												src={getAvatarPath(profile.avatar_url) as string}
											/>
										)}
										<AvatarFallback className="">
											{profile.full_name?.at(0)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<CommandItem
										className={cn(
											index > 4 ? 'hidden' : 'flex',
											'h-10 p-0 px-2 items-center'
										)}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setOpen(false)
										}}
									>
										<Link
											className={buttonVariants({
												variant: 'link',
												className: 'h-full w-full underl !no-underline'
											})}
											href={`/profile/${profile.username}`}
										>
											{profile.username}
										</Link>
									</CommandItem>
								</div>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
