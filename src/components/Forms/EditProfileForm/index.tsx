'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

import { sbClient as supabase } from '@/services/supabase/client'
import { Profile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const editProfileSchema = z.object({
	username: z.string().min(3).max(20),
	fullname: z.string().min(3).max(30),
	website: z.union([
		z
			.string()
			.url('This URL is invalid. Please check if URL contains "https://"')
			.nullish(),
		z.literal('')
	])
})

type FormData = z.infer<typeof editProfileSchema>

export const EditProfileForm = ({ profile }: Profile) => {
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(editProfileSchema)
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
			console.log(error)
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

				<span className="text-muted-foreground text-sm">
					Personalize your name, username and your website if you have.
				</span>
			</div>

			<div className="flex flex-col gap-6">
				<div className="relative w-full  md:w-80">
					<Label
						className="bg-background absolute -top-2 left-3 px-1"
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
						className="bg-background absolute -top-2 left-3 px-1"
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
						className="bg-background absolute -top-2 left-3 px-1"
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
