'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'

import { siteConfig } from '@/config/site'
import { clsx } from 'clsx'

interface SidebarNavProps {
	username: string | null | undefined
}

export const SidebarNav = ({ username }: SidebarNavProps) => {
	const pathname = usePathname()

	return (
		<>
			{siteConfig.sidebarDashboard.map((item, index) => (
				<Link
					prefetch={false}
					key={index}
					href={
						item.href.includes('profile')
							? `${item.href}/${username}`
							: item.href
					}
					className={buttonVariants({
						variant: 'ghost',
						className: clsx(
							'flex items-center !justify-start gap-2',
							pathname === item.href && 'bg-primary text-primary-foreground',
							pathname.includes('/profile') &&
								item.href.includes('/profile') &&
								'bg-primary text-primary-foreground'
						)
					})}
				>
					<item.icon className="h-4 w-4" />
					{item.title}
				</Link>
			))}
		</>
	)
}
