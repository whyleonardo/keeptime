export type SiteConfig = typeof siteConfig
import { Settings, CreditCard, Home, UserCircle2 } from 'lucide-react'

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
			title: 'Memories',
			href: '/memories'
		}
	],
	sidebarDashboard: [
		{
			title: 'Home',
			href: '/memories',
			icon: Home
		},
		{
			title: 'Profile',
			href: '/profile',
			icon: UserCircle2
		},
		{
			title: 'Billing',
			href: '/billing',
			icon: CreditCard
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: Settings
		}
	],
	links: {
		twitter: 'https://twitter.com/shadcn',
		github: 'https://github.com/shadcn/ui',
		docs: 'https://ui.shadcn.com'
	}
}
