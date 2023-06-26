import { Skeleton } from '@/components/ui/skeleton'

export const FormSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-4 rounded-md border p-6">
			<div className="mb-4">
				<Skeleton className="mb-2 h-6 w-48" />

				<Skeleton className="h-4 w-64" />
			</div>

			<div className="flex flex-col gap-6">
				<Skeleton className="relative h-10 w-full md:w-80" />
				<Skeleton className="relative h-10 w-full md:w-80" />
				<Skeleton className="relative h-10 w-full md:w-80" />
			</div>

			<Skeleton className="mt-2 h-10 w-20" />
		</div>
	)
}
