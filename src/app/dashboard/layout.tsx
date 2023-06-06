import { DashboardPageTitle } from '@/components/DashboardPageTitle'
import { SidebarNav } from '@/components/Nav/SidebarNav'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen gap-10">
			<aside className="hidden w-60 flex-col gap-4 border-r p-6 sm:flex">
				<SidebarNav />
			</aside>

			<div className="p-6">
				<DashboardPageTitle />
				{children}
			</div>
		</div>
	)
}
