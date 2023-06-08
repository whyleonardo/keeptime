export type SiteConfig = typeof siteConfig
import { Album, Settings, CreditCard } from 'lucide-react'

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
			title: 'Memories',
			href: '/dashboard',
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
