import { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from '@/components/Forms/UserAuthForm'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account'
}

export default function LoginPage() {
	const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'absolute left-4 top-4 md:left-8 md:top-8'
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col items-center space-y-2 text-center">
					<Icons.logo className="h-6 w-6 fill-foreground" />
					<h1 className="text-2xl font-semibold tracking-tight">
						Hey, welcome!
					</h1>
					<p className="text-sm text-muted-foreground">
						Choose a method to login to your account
					</p>
				</div>
				<UserAuthForm SITE_URL={SITE_URL} />
			</div>
		</div>
	)
}
