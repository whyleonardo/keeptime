import { RequireUsernameDialog } from '@/components/Dialogs/RequireUsernameDialog'
import { SidebarNav } from '@/components/Nav/SidebarNav'
import { PageHeader } from '@/components/PageHeader'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { sbServer as supabase } from '@/services/supabase/server'

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const user = (await supabase.auth.getUser()).data.user

	if (!user) {
		return null
	}
	return (
		<>
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
			{/* @ts-ignore -- Server Component */}
			<PageHeader />

			<div className="flex h-full min-h-screen w-full pb-4">
				<aside className="hidden w-72 flex-col gap-4 p-4 sm:flex">
					<SidebarNav />
				</aside>

				<ScrollArea className="h-full w-full overflow-x-hidden p-6 md:pb-16">
					<ScrollBar />
					{children}
				</ScrollArea>

				<RequireUsernameDialog userId={user?.id} />
			</div>
		</>
	)
}
