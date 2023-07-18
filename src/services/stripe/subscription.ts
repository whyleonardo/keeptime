// TODO: Fix this when we turn strict mode on.
import { freePlan, proPlan } from '@/services/stripe/subscriptions'
import { UserSubscriptionPlan } from '@/types/subscription'
import { getProfileById } from '@/utils/getProfileById'

export async function getUserSubscriptionPlan(
	userId: string
): Promise<UserSubscriptionPlan> {
	const user = await getProfileById(userId)

	if (!user) {
		throw new Error('User not found')
	}

	// Check if user is on a pro plan.
	const isPro = user.stripe_price_id
		? new Date(user.stripe_current_period_end as string).getTime() +
				86_400_000 >
		  Date.now()
		: false

	const plan = isPro ? proPlan : freePlan

	return {
		...plan,
		...user,
		stripeCurrentPeriodEnd: new Date(
			user.stripe_current_period_end as string
		).getTime(),
		isPro
	}
}
