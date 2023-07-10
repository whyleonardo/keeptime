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

	const profile = (
		await supabase
			.from('profiles')
			.select('username')
			.eq('id', user.id)
			.single()
	).data

	if (!profile) {
		return null
	}

	return (
		<div className="h-full min-h-screen">
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
			{/* @ts-ignore -- Server Component */}
			<PageHeader />

			<div className="grid h-full min-h-screen w-full grid-cols-1 pb-4 md:grid-cols-[14rem_1fr]">
				<aside className="hidden w-full flex-col gap-4 p-4 sm:flex">
					<SidebarNav username={profile.username} />
				</aside>

				<ScrollArea>
					<ScrollBar />
					<main className="px-8 pb-28 pt-8 md:p-8">{children}</main>
				</ScrollArea>

				<RequireUsernameDialog userId={user.id} />
			</div>
		</div>
	)
}
