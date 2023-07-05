export type SiteConfig = typeof siteConfig
import { Album, Settings, CreditCard, Home } from 'lucide-react'

export const siteConfig = {
	name: 'Keeptime',
	description:
		'Keeptime is a simple and beautiful way to capture and share your memories.',
	mainNav: [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Login',
			href: '/login'
		},
		{
			title: 'Dashboard',
			href: '/dashboard'
		}
	],
	sidebarDashboard: [
		{
			title: 'Home',
			href: '/dashboard',
			icon: Home
		},
		{
			title: 'My Memories',
			href: '/dashboard/my-memories',
			icon: Album
		},
		{
			title: 'Billing',
			href: '/dashboard/billing',
			icon: CreditCard
		},
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: Settings
		}
	],
	links: {
		twitter: 'https://twitter.com/shadcn',
		github: 'https://github.com/shadcn/ui',
		docs: 'https://ui.shadcn.com'
	}
}
