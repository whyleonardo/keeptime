import { Metadata } from 'next'

import { EditProfileForm } from '@/components/Forms/EditProfileForm'

import { sbServer as supabase } from '@/services/supabase/server'

export const metadata: Metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.'
}

export default async function SettingsPage() {
	const {
		data: { user }
	} = await supabase.auth.getUser()

	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user?.id)
		.single()

	return (
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">Settings</h1>

			<div className="flex w-full flex-col gap-8">
				<span className="text-lg text-muted-foreground">
					Manage account and website settings.
				</span>

				<EditProfileForm profile={data} />
			</div>
		</>
	)
}
