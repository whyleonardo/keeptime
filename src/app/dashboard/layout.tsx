import { DashboardPageTitle } from '@/components/DashboardPageTitle'
import { SidebarNav } from '@/components/Nav/SidebarNav'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex h-full min-h-screen w-full pb-4">
			<aside className="hidden w-72 flex-col gap-4 p-4 sm:flex">
				<SidebarNav />
			</aside>

			<ScrollArea className="h-full w-full overflow-x-hidden p-6 md:pb-16">
				<ScrollBar />
				{/* <DashboardPageTitle /> */}
				{children}
			</ScrollArea>
		</div>
	)
}
