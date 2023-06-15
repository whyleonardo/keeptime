import Image from 'next/image'
import Link from 'next/link'

import { SignOutButton } from '@/components/Buttons/SignOutButton'
import { Icons } from '@/components/Icons'
import { MainNav } from '@/components/Nav/MainNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { sbServer as supabase } from '@/services/supabase/server'

export const PageHeader = async () => {
	const {
		data: { user }
	} = await supabase.auth.getUser()

	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user?.id)
		.single()

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						{user && (
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									<Image
										alt="user avatar"
										width={24}
										height={24}
										className="h-8 w-8 rounded-full"
										src={user?.user_metadata?.avatar_url}
									/>

									<Icons.chevronDown className="h-6 w-6" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>
										<span className="block text-base font-medium">
											{data?.full_name}
										</span>
										<span className="block w-[200px] truncate text-sm font-normal text-muted-foreground">
											{user.email}
										</span>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />
									<DropdownMenuLabel>Dashboard</DropdownMenuLabel>

									<DropdownMenuItem>
										<Icons.album className="h-4 w-6" />
										<Link className="w-full" href="/dashboard">
											Memories
										</Link>
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									<DropdownMenuLabel>Account</DropdownMenuLabel>

									<div className="flex flex-col gap-2">
										<DropdownMenuItem>
											<Icons.settings className="h-4 w-6" />
											<Link className="w-full" href="/dashboard/settings">
												Settings
											</Link>
										</DropdownMenuItem>

										<DropdownMenuItem>
											<Icons.logout className="h-4 w-6" />
											<SignOutButton />
										</DropdownMenuItem>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}
