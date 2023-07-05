import '@/styles/globals.css'
import { Metadata } from 'next'

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
		icon: '/favicons/app.ico',
		shortcut: '/images/logo/app-logo-light.png',
		apple: '/images/logo/app-logo-light.png'
	}
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html className="h-full" lang="en" suppressHydrationWarning>
				{/* eslint-disable-next-line @next/next/no-head-element*/}
				<head />
				<body
					className={cn(
						'bg-background font-sans antialiased h-full min-h-[calc(100vh-4rem)] overflow-y-hidden overflow-x-hidden',
						fontSans.variable
					)}
				>
					<AuthProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<div className="relative flex h-full flex-col">
								<div className="h-full flex-1">{children}</div>
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
