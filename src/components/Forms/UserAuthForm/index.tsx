'use client'

import * as React from 'react'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { cn } from '@/lib/utils'
import { sbClient as supabase } from '@/services/supabase/client'
import { getURL } from '@/utils/getURL'

export const UserAuthForm = () => {
	const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
	const [isDiscordLoading, setIsDiscordLoading] = React.useState<boolean>(false)

	console.log(process.env.SITE_URL, 'URL')

	async function githubLogin() {
		setIsGitHubLoading(true)
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: process.env.SITE_URL
			}
		})

		setIsGitHubLoading(false)

		return toast({
			title: 'Sucess',
			description: 'You have successfully logged in!'
		})
	}

	async function discordLogin() {
		setIsDiscordLoading(true)
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: process.env.SITE_URL
			}
		})

		setIsDiscordLoading(false)

		return toast({
			title: 'Sucess',
			description: 'You have successfully logged in!'
		})
	}

	return (
		<div className="flex flex-col space-y-2">
			<button
				type="button"
				className={cn(buttonVariants({ variant: 'outline' }))}
				onClick={githubLogin}
				disabled={isGitHubLoading}
			>
				{isGitHubLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="fill-primary mr-2 h-4 w-4" />
				)}{' '}
				Github
			</button>

			<button
				type="button"
				className={cn(buttonVariants({ variant: 'outline' }))}
				onClick={discordLogin}
				disabled={isDiscordLoading}
			>
				{isDiscordLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.discord className="fill-primary mr-2 h-4 w-4" />
				)}{' '}
				Discord
			</button>
		</div>
	)
}
