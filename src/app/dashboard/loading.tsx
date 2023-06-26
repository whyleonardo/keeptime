import { CardSkeleton } from '@/components/Skeletons/CardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
	return (
		<>
			<Skeleton className="mb-2 h-6 w-48" />

			<div className="relative mb-32 mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md p-6 md:mb-0 md:border">
				<CardSkeleton />
			</div>
		</>
	)
}
