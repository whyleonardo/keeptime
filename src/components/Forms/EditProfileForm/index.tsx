'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { AvatarPicker } from '@/components/ui/avatar-picker'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

import { profileSchema } from '@/lib/validations/profile'
import { sbClient as supabase } from '@/services/supabase/client'
import { Database } from '@/types/supabase'
import { getAvatarPath } from '@/utils/getAvatarPath'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormData = z.infer<typeof profileSchema>

interface EditProfileFormProps {
	profile: Database['public']['Tables']['profiles']['Row']
}

export const EditProfileForm = ({ profile }: EditProfileFormProps) => {
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

	const form = useForm<FormData>({
		resolver: zodResolver(profileSchema)
	})

	const router = useRouter()

	async function onSubmit(values: FormData) {
		console.log(values)

		setIsUpdatingProfile(true)

		const {
			data: { user }
		} = await supabase.auth.getUser()

		const storage = values.avatar
			? await supabase.storage
					.from('medias')
					.upload(`avatars/${crypto.randomUUID()}`, values.avatar)
			: null

		console.log(storage)

		try {
			await supabase
				.from('profiles')
				.update({
					full_name: values.fullname,
					website: values.website,
					username: values.username,
					bio: values.bio,
					avatar_url: storage ? storage.data?.path : null
				})
				.eq('id', user?.id)
				.throwOnError()

			setIsUpdatingProfile(false)

			router.refresh()

			return toast({
				title: 'Success',
				description: 'Your profile has been updated!',
				variant: 'success'
			})
		} catch (error) {
			setIsUpdatingProfile(false)

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// TODO: FIX THIS ERROR INSTANCE
			if (error.code === 23514) {
				return toast({
					title: 'Error',
					description: 'This username is invalid!',
					variant: 'destructive'
				})
			}
			return toast({
				title: 'Error',
				description: 'Username already taken!',
				variant: 'destructive'
			})
		}
	}

	if (!profile) {
		return null
	}

	const profileAvatar = getAvatarPath(profile.avatar_url)

	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-4 rounded-md border p-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="mb-4">
					<h2 className="text-lg font-semibold">Edit Your Profile</h2>

					<span className="text-sm text-muted-foreground">
						Personalize your name, username and your website if you have.
					</span>
				</div>

				<div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-[20rem_1fr] md:place-items-center md:justify-center">
					<div className="flex flex-col gap-6">
						<div className="relative w-full md:w-80">
							<Label
								className="absolute -top-2 left-3 bg-background px-1"
								htmlFor="fullname"
							>
								Your Name
							</Label>
							<Input
								autoComplete="off"
								aria-autocomplete="none"
								spellCheck={false}
								{...form.register('fullname', {
									value: profile?.full_name || undefined
								})}
								id="fullname"
							/>
							{form.formState.errors.fullname && (
								<p className="mt-1 text-xs text-red-500">
									{form.formState.errors.fullname.message}
								</p>
							)}
						</div>

						<div className="relative w-full  md:w-80">
							<Label
								className="absolute -top-2 left-3 bg-background px-1"
								htmlFor="username"
							>
								Username
							</Label>
							<Input
								autoComplete="off"
								aria-autocomplete="none"
								spellCheck={false}
								{...form.register('username', {
									value: profile?.username || undefined
								})}
								id="username"
							/>
							{form.formState.errors.username && (
								<p className="mt-1 text-xs text-red-500">
									{form.formState.errors.username.message}
								</p>
							)}
						</div>

						<div className="relative w-full md:w-80">
							<Label
								className="absolute -top-2 left-3 bg-background px-1"
								htmlFor="website"
							>
								Website
							</Label>
							<Input
								autoComplete="off"
								aria-autocomplete="none"
								spellCheck={false}
								{...form.register('website', {
									value: profile?.website || undefined
								})}
								id="website"
							/>
							{form.formState.errors.website && (
								<p className="mt-1 text-xs text-red-500">
									{form.formState.errors.website.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col items-center gap-6 md:flex-row">
						<FormField
							control={form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<AvatarPicker field={field} avatarUrl={profileAvatar} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="relative w-full md:w-80">
							<Label
								className="absolute -top-2 left-3 bg-background px-1"
								htmlFor="bio"
							>
								Bio
							</Label>
							<Textarea
								autoComplete="off"
								aria-autocomplete="none"
								spellCheck={false}
								className="h-20 resize-none"
								{...form.register('bio', {
									value: profile?.bio || undefined
								})}
								id="website"
							/>
							{form.formState.errors.bio && (
								<p className="mt-1 text-xs text-red-500">
									{form.formState.errors.bio.message}
								</p>
							)}
						</div>
					</div>
				</div>

				<Button className="mt-2 w-20" type="submit">
					{isUpdatingProfile ? (
						<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
					) : (
						'Save'
					)}
				</Button>
			</form>
		</Form>
	)
}
