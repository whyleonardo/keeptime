import { Metadata } from 'next'

import { EditProfileForm } from '@/components/Forms/EditProfileForm'

import { getAuthUser } from '@/utils/getAuthUser'
import { getProfileById } from '@/utils/getProfileById'

export const metadata: Metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.'
}

export default async function SettingsPage() {
	const user = await getAuthUser()

	if (!user) {
		return null
	}

	const profile = await getProfileById(user.id)

	if (!profile) {
		return null
	}

	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">Settings</h1>

			<div className="flex w-full flex-col gap-8">
				<span className="text-lg text-muted-foreground">
					Manage account and website settings.
				</span>

				<EditProfileForm profile={profile} />
			</div>
		</>
	)
}
