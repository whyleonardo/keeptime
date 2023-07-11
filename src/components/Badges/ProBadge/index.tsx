import { Icons } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'

import { getUserSubscriptionPlan } from '@/services/stripe/subscription'

interface ProBadgeProps {
	id: string
}

export const ProBadge = async ({ id }: ProBadgeProps) => {
	const { isPro } = await getUserSubscriptionPlan(id)

	return (
		<>
			{isPro && (
				<Badge className="select-none" variant="pro">
					<span>Pro</span>
					<Icons.star className="fill-muted-foreground h-[0.60rem] w-[0.60rem]" />
				</Badge>
			)}
		</>
	)
}
