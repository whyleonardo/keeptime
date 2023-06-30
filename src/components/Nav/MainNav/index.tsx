import * as React from 'react'

import { Icons } from '@/components/Icons'

import { siteConfig } from '@/config/site'

export const MainNav = () => {
	return (
		<div className="flex gap-6 md:gap-10">
			<div className="flex items-center space-x-2">
				<Icons.logo className="h-6 w-6 fill-foreground" />
				<span className="inline-block font-bold">{siteConfig.name}</span>
			</div>
		</div>
	)
}
