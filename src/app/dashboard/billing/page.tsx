import { redirect } from 'next/navigation'

import { BillingForm } from '@/components/Forms/BillingForm'

import { stripe } from '@/services/stripe'
import { getUserSubscriptionPlan } from '@/services/stripe/subscription'
import { sbServer as supabase } from '@/services/supabase/server'

// import { Metadata } from 'next'

// export const metadata: Metadata = {
// 	title: 'Billing',
// 	description: 'Manage billing and subscription settings.'
// }

export default async function BillingPage() {
	const user = (await supabase.auth.getUser()).data.user

	if (!user) {
		redirect('/login')
	}

	const subscriptionPlan = await getUserSubscriptionPlan(user?.id)

	let isCanceled = false
	if (subscriptionPlan.isPro && subscriptionPlan.stripe_subscription_id) {
		const stripePlan = await stripe.subscriptions.retrieve(
			subscriptionPlan.stripe_subscription_id
		)
		isCanceled = stripePlan.cancel_at_period_end
	}

	return (
		<div className="flex flex-col gap-4">
			<BillingForm
				subscriptionPlan={{
					...subscriptionPlan,
					isCanceled
				}}
			/>
		</div>
	)
}
