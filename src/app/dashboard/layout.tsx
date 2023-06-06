import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

import { siteConfig } from '@/config/site'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen gap-10">
			<aside className="flex w-60 flex-col gap-4 border-r p-6">
				{siteConfig.sidebarDashboard.map((item) => (
					<Link
						prefetch={false}
						key={item.href}
						href={item.href}
						className={buttonVariants({
							variant: 'ghost',
							class: 'flex gap-2 items-center'
						})}
					>
						<item.icon className="h-4 w-4" />
						{item.title}
					</Link>
				))}
			</aside>
			{children}
		</div>
	)
}
