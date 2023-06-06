'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'

import { siteConfig } from '@/config/site'

export const SidebarNav = () => {
	const pathname = usePathname()
	return (
		<>
			{siteConfig.sidebarDashboard.map((item, index) => (
				<Link
					prefetch={false}
					key={index}
					href={item.href}
					className={buttonVariants({
						variant: 'ghost',
						className: `flex gap-2 items-center !justify-start ${
							pathname === item.href && 'bg-primary text-primary-foreground'
						}`
					})}
				>
					<item.icon className="h-4 w-4" />
					{item.title}
				</Link>
			))}
		</>
	)
}
