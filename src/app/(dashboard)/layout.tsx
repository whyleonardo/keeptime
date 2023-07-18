import { RequiredUserInfoDialog } from '@/components/Dialogs/RequiredUserInfoDialog'
import { SidebarNav } from '@/components/Nav/SidebarNav'
import { PageHeader } from '@/components/PageHeader'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { getAuthUser } from '@/utils/getAuthUser'
import { getProfileById } from '@/utils/getProfileById'

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const user = await getAuthUser()

	if (!user) {
		return null
	}

	const profile = await getProfileById(user.id)

	const profileInfo = {
		full_name: profile?.full_name,
		username: profile?.username,
		id: profile?.id
	}

	if (!profile) {
		return null
	}

	return (
		<div className="h-full min-h-screen">
			{/* @ts-expect-error -- Server Component */}
			<PageHeader />

			<div className="grid h-full min-h-screen w-full grid-cols-1 pb-4 md:grid-cols-[14rem_1fr]">
				<aside className="hidden w-full flex-col gap-4 p-4 md:flex">
					<SidebarNav username={profile.username} />
				</aside>

				<ScrollArea>
					<ScrollBar />
					<main className="px-8 pb-32 pt-8 md:p-8">{children}</main>
				</ScrollArea>

				<RequiredUserInfoDialog profile={profileInfo} />
			</div>
		</div>
	)
}
