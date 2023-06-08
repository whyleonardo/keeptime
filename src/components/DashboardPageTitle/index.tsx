'use client'

import { usePathname } from 'next/navigation'

export const DashboardPageTitle = () => {
	const pathname = usePathname()

	const getLastWordRegexp = /\/([^/]+)$/
	const match = pathname.match(getLastWordRegexp)
	const lastWord = match ? match[1] : null

	return (
		<h1 className="mb-2 text-4xl font-bold capitalize tracking-tight">
			{lastWord}
		</h1>
	)
}
