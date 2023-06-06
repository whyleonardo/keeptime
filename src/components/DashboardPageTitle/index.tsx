'use client'

import { usePathname } from 'next/navigation'

export const DashboardPageTitle = () => {
	const pathname = usePathname()

	const getLastWordRegexp = /\/([^/]+)$/
	const match = pathname.match(getLastWordRegexp)
	const lastWord = match ? match[1] : null

	return <h1 className="text-2xl font-semibold capitalize">{lastWord}</h1>
}
