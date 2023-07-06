'use client'

import { useRouter, usePathname } from 'next/navigation'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

import { siteConfig } from '@/config/site'

export const MainNav = () => {
	const router = useRouter()
	const pathname = usePathname()

	function onClick() {
		router.back()
	}
	return (
		<div className="flex gap-6 md:gap-10">
			<div className="flex select-none items-center space-x-2">
				{pathname === '/dashboard' ? (
					<>
						<Icons.logo className="fill-foreground h-6 w-6" />
						<span className="inline-block font-bold">{siteConfig.name}</span>
					</>
				) : (
					<Button onClick={onClick} variant="ghost" size="icon">
						<Icons.chevronLeft />
					</Button>
				)}
			</div>
		</div>
	)
}
