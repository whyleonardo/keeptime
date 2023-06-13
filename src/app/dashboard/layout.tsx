import { DashboardPageTitle } from '@/components/DashboardPageTitle'
import { SidebarNav } from '@/components/Nav/SidebarNav'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex h-full min-h-screen w-full">
			<aside className="hidden w-72 flex-col gap-4 p-4 sm:flex">
				<SidebarNav />
			</aside>

			<ScrollArea className="min-h-screen w-full p-6 pb-20">
				<ScrollBar />
				<DashboardPageTitle />
				{children}
			</ScrollArea>
		</div>
	)
}
