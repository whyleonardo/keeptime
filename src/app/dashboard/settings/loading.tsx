import { FormSkeleton } from '@/components/Skeletons/FormSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
	return (
		<>
			<Skeleton className="mb-2 h-6 w-52" />

			<div className="flex w-full flex-col gap-8">
				<Skeleton className="h-4 w-44" />

				<FormSkeleton />
			</div>
		</>
	)
}
