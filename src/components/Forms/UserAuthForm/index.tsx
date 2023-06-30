'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { cn } from '@/lib/utils'
import { sbClient as supabase } from '@/services/supabase/client'

export const UserAuthForm = () => {
	const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
	const [isDiscordLoading, setIsDiscordLoading] = React.useState<boolean>(false)
	const router = useRouter()
	async function githubLogin() {
		setIsGitHubLoading(true)
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${location.origin}/auth/callback`
			}
		})
		setIsGitHubLoading(false)
		router.refresh()

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
				redirectTo: `${location.origin}/auth/callback`
			}
		})
		setIsDiscordLoading(false)
		router.refresh()

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
					<Icons.gitHub className="mr-2 h-4 w-4 fill-primary" />
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
					<Icons.discord className="mr-2 h-4 w-4 fill-primary" />
				)}{' '}
				Discord
			</button>
		</div>
	)
}
