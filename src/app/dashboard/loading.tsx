import { Icons } from '@/components/Icons'

export default function DashboardLoading() {
	return (
		<div className="flex h-[80vh] items-center justify-center">
			<Icons.spinner className="text-muted-foreground h-8 w-8 animate-spin" />
		</div>
	)
}
