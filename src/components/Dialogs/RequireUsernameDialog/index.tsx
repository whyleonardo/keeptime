'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

import { profileSchema } from '@/lib/validations/profile'
import { sbClient as supabase } from '@/services/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface RequireUsernameDialogProps {
	userId: string
}

type FormData = Pick<z.infer<typeof profileSchema>, 'username'>

export const RequireUsernameDialog = ({
	userId
}: RequireUsernameDialogProps) => {
	const [open, setOpen] = useState(false)
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

	const {
		register,
		getValues,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(profileSchema)
	})

	async function onSubmit() {
		setIsUpdatingProfile(true)

		const username = getValues('username')

		try {
			await supabase
				.from('profiles')
				.update({
					username: username
				})
				.eq('id', userId)
				.throwOnError()

			setIsUpdatingProfile(false)

			setOpen(false)

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

	useEffect(() => {
		async function checkIfUserHaveAnUsername() {
			const profile = (
				await supabase
					.from('profiles')
					.select('username')
					.eq('id', userId)
					.single()
			).data

			if (!profile?.username) {
				return setOpen(true)
			}
		}

		checkIfUserHaveAnUsername()
	})

	return (
		<Dialog open={open}>
			<DialogContent displayCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Ops!</DialogTitle>
					<DialogDescription>
						You don&apos;t have a username yet. Please, create one to continue.
					</DialogDescription>
				</DialogHeader>

				<div className="flex w-full items-center gap-4 rounded-md p-4">
					<div className="relative w-full md:w-80">
						<Label
							className="absolute -top-2 left-3 bg-background px-1"
							htmlFor="required-username"
						>
							Username
						</Label>
						<Input
							autoComplete="off"
							aria-autocomplete="none"
							spellCheck={false}
							{...register('username')}
							id="required-username"
						/>
						{errors.username && (
							<p className="mt-1 text-xs text-red-500">
								{errors.username.message}
							</p>
						)}
					</div>

					<Button className="w-20" onClick={() => onSubmit()}>
						{isUpdatingProfile ? (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						) : (
							'Save'
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
