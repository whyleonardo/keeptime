import Link from 'next/link'

import { ProBadge } from '@/components/Badges/ProBadge'
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

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { getAuthUser } from '@/utils/getAuthUser'
import { getAvatarPath } from '@/utils/getAvatarPath'
import { getProfileById } from '@/utils/getProfileById'

export const PageHeader = async () => {
	const user = await getAuthUser()

	if (!user) {
		return null
	}

	const profile = await getProfileById(user.id)

	if (!profile) {
		return null
	}

	const profileAvatar = getAvatarPath(profile.avatar_url)

	return (
		<header className="bg-background w-full border-b shadow-sm">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						{user && (
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									<Avatar className="h-8 w-8">
										{profileAvatar && <AvatarImage src={profileAvatar} />}
										<AvatarFallback>
											{profile.full_name?.at(0)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>

									<Icons.chevronDown className="h-6 w-6" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>
										<div className="flex items-center gap-1">
											<span className="block text-base font-medium">
												{profile?.full_name || profile?.username}
											</span>
											{/* @ts-expect-error Async Server Component */}
											<ProBadge id={user.id} />
										</div>
										<span className="text-muted-foreground block w-[200px] truncate text-sm font-normal">
											{user.email}
										</span>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />
									<DropdownMenuLabel>Dashboard</DropdownMenuLabel>

									<div className="flex flex-col gap-2">
										<DropdownMenuItem>
											<Icons.home className="h-4 w-6" />
											<Link className="w-full" href="/dashboard">
												Home
											</Link>
										</DropdownMenuItem>

										<DropdownMenuItem>
											<Icons.user className="h-4 w-6" />
											<Link
												className="w-full"
												href={`/dashboard/${profile.username}`}
											>
												Profile
											</Link>
										</DropdownMenuItem>
									</div>

									<DropdownMenuSeparator />

									<DropdownMenuLabel>Account</DropdownMenuLabel>

									<div className="flex flex-col gap-2">
										<DropdownMenuItem>
											<Icons.creditCard className="h-4 w-6" />
											<Link className="w-full" href="/dashboard/billing">
												Billing
											</Link>
										</DropdownMenuItem>

										<DropdownMenuItem>
											<Icons.settings className="h-4 w-6" />
											<Link className="w-full" href="/dashboard/settings">
												Settings
											</Link>
										</DropdownMenuItem>

										<DropdownMenuItem className="md:hidden">
											<ThemeToggle isMobile />
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
