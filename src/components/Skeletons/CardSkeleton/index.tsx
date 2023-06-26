import { Skeleton } from '@/components/ui/skeleton'

export const CardSkeleton = () => {
	return (
		<div className="flex h-full w-full flex-col items-center overflow-hidden last:pb-20">
			<Skeleton className="mb-4 h-4 w-44" />

			<div className="flex w-full flex-col items-center lg:w-3/4">
				<div className="flex w-full flex-col items-center">
					<Skeleton className="mb-2 h-4 w-44 self-center" />
					<Skeleton className="h-[48.125rem] w-full" />

					<div className="group ml-2 mt-2 flex items-center gap-1 self-start">
						<Skeleton className="h-5 w-5 rounded-full" />

						<Skeleton className="h-4 w-44" />
					</div>
				</div>
			</div>
		</div>
	)
}
