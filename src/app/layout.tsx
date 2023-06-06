import '@/styles/globals.css'
import { Metadata } from 'next'

import { MediaSizeIndicator } from '@/components/MediaSizeIndicator'
import { PageHeader } from '@/components/PageHeader'
import { Toaster } from '@/components/ui/toaster'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/providers/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png'
	}
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				{/* eslint-disable-next-line @next/next/no-head-element*/}
				<head />
				<body
					className={cn(
						'min-h-screen bg-background font-sans antialiased',
						fontSans.variable
					)}
				>
					<AuthProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<div className="relative flex min-h-screen flex-col overflow-x-hidden">
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
								{/* @ts-ignore -- Server Component */}
								<PageHeader />
								<div className="flex-1">{children}</div>
							</div>
							<MediaSizeIndicator />
							<Toaster />
						</ThemeProvider>
					</AuthProvider>
				</body>
			</html>
		</>
	)
}
