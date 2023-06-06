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

import { siteConfig } from '@/config/site'
import { sbServer as supabase } from '@/services/supabase/server'

export const PageHeader = async () => {
	const {
		data: { user }
	} = await supabase.auth.getUser()

	return (
		<header className="bg-background sticky top-0 z-40 w-full border-b shadow-sm">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav} />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						{user && (
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-2">
									<Image
										alt="user avatar"
										width={24}
										height={24}
										className="h-8 w-8 rounded-full"
										src={user?.user_metadata?.avatar_url}
									/>

									<span className="flex items-center gap-1">
										{user?.user_metadata?.full_name}
										<Icons.chevronDown className="h-6 w-6" />
									</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
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
