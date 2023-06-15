'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export const DashboardPageTitle = () => {
	const pathname = usePathname()

	const profilePath = pathname.includes('/profile')

	const getLastWordRegexp = /\/([^/]+)$/
	const match = pathname.match(getLastWordRegexp)
	const lastWord = match ? match[1] : null

	return (
		<h1
			className={cn(
				!profilePath && 'capitalize',
				'mb-2 text-4xl font-bold tracking-tight'
			)}
		>
			{lastWord}
		</h1>
	)
}
