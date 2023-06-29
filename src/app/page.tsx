import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default function IndexPage() {
	return (
		<>
			<header className="flex h-16 w-full items-center justify-between px-12">
				<div className="flex items-center space-x-12">
					<div className="flex items-center space-x-2">
						<Icons.logo className="fill-foreground h-6 w-6" />
						<span className="inline-block font-bold">{siteConfig.name}</span>
					</div>

					<nav className="text-foreground/60  flex items-center gap-6 text-sm font-medium transition-colors">
						<Link
							className="hover:text-muted-foreground/80"
							href="/"
							prefetch={false}
						>
							Home
						</Link>
						<Link className="hover:text-muted-foreground/80" href="/login">
							Login
						</Link>
					</nav>
				</div>

				<ThemeToggle />
			</header>

			<section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<Icons.logo className="fill-primary h-14 w-14 sm:h-20 sm:w-20" />

					<h1 className="font-heading text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl">
						Relive, Remember, Keeptime
					</h1>

					<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
						Keeptime is a platform that allows you to keep track of your
						memories. You can upload photos and videos, and share them with your
						friends.
					</p>

					<Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
						Get Started
					</Link>
				</div>
			</section>
		</>
	)
}
