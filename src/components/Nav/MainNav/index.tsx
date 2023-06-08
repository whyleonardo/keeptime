import Link from 'next/link'
import * as React from 'react'

import { Icons } from '@/components/Icons'

import { siteConfig } from '@/config/site'

export const MainNav = () => {
	return (
		<div className="flex gap-6 md:gap-10">
			<Link href="/" prefetch={false} className="flex items-center space-x-2">
				<Icons.logo className="fill-foreground h-6 w-6" />
				<span className="inline-block font-bold">{siteConfig.name}</span>
			</Link>
		</div>
	)
}
