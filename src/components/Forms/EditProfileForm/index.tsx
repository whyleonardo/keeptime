'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

import { profileSchema } from '@/lib/validations/profile'
import { sbClient as supabase } from '@/services/supabase/client'
import { Profile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormData = z.infer<typeof profileSchema>

interface EditProfileFormProps {
	profile: Profile
}

export const EditProfileForm = ({ profile }: EditProfileFormProps) => {
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(profileSchema)
	})

	async function onSubmit(data: FormData) {
		setIsUpdatingProfile(true)

		const {
			data: { user }
		} = await supabase.auth.getUser()

		try {
			await supabase
				.from('profiles')
				.update({
					full_name: data.fullname,
					website: data.website,
					username: data.username
				})
				.eq('id', user?.id)
				.throwOnError()

			setIsUpdatingProfile(false)

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

	return (
		<form
			className="flex w-full flex-col gap-4 rounded-md border p-6"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="mb-4">
				<h2 className="text-lg font-semibold">Edit Your Profile</h2>

				<span className="text-sm text-muted-foreground">
					Personalize your name, username and your website if you have.
				</span>
			</div>

			<div className="flex flex-col gap-6">
				<div className="relative w-full  md:w-80">
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
						{...register('fullname', {
							value: profile?.full_name || undefined
						})}
						id="fullname"
					/>
					{errors.fullname && (
						<p className="mt-1 text-xs text-red-500">
							{errors.fullname.message}
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
						{...register('username', { value: profile?.username || undefined })}
						id="username"
					/>
					{errors.username && (
						<p className="mt-1 text-xs text-red-500">
							{errors.username.message}
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
						{...register('website', {
							value: profile?.website || undefined
						})}
						id="website"
					/>
					{errors.website && (
						<p className="mt-1 text-xs text-red-500">
							{errors.website.message}
						</p>
					)}
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
	)
}
