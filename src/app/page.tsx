import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default function IndexPage() {
	return (
		<section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
			<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
				<Icons.logo className="fill-primary h-14 w-14 sm:h-20 sm:w-20" />

				<h1 className="font-heading text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl">
					Relive, Remember, Keeptime
				</h1>

				<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
					I&apos;m building a web app with Next.js 13 and open sourcing
					everything. Follow along as we figure this out together.
				</p>

				<Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
					Get Started
				</Link>
			</div>
		</section>
	)
}
