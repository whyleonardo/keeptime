import '@/styles/globals.css'
import { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'
import { ScreenIndicator } from '@/components/ScreenIndicator'
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
						'bg-background font-sans antialiased min-h-[calc(100vh-4rem)] overflow-y-hidden overflow-x-hidden',
						fontSans.variable
					)}
				>
					<AuthProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<div className="relative flex flex-col ">
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
								{/* @ts-ignore -- Server Component */}
								<PageHeader />
								<div className="flex-1">{children}</div>
							</div>
							<ScreenIndicator />
							<Toaster />
						</ThemeProvider>
					</AuthProvider>
				</body>
			</html>
		</>
	)
}
