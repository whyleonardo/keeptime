import { DashboardPageTitle } from '@/components/DashboardPageTitle'
import { SidebarNav } from '@/components/Nav/SidebarNav'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex h-full min-h-screen w-full">
			<aside className="hidden w-72 flex-col gap-4 border-r p-4 sm:flex">
				<SidebarNav />
			</aside>

			<div className="min-h-screen w-full overflow-y-auto p-6 pb-20">
				<DashboardPageTitle />
				{children}
			</div>
		</div>
	)
}
