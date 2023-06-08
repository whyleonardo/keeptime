import Image from 'next/image'

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

	const currentUser = data?.at(0)

	return (
		<header className="bg-background sticky top-0 z-40 w-full border-b shadow-sm">
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
											{currentUser?.full_name}
										</span>
										<span className="text-muted-foreground block w-[200px] truncate text-sm font-normal">
											{user.email}
										</span>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Icons.logout className="h-4 w-6" />
										<SignOutButton />
									</DropdownMenuItem>
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
