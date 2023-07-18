import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { BillingForm } from '@/components/Forms/BillingForm'

import { stripe } from '@/services/stripe'
import { getUserSubscriptionPlan } from '@/services/stripe/subscription'
import { getAuthUser } from '@/utils/getAuthUser'

export const metadata: Metadata = {
	title: 'Billing',
	description: 'Manage billing and subscription settings.'
}

export default async function BillingPage() {
	const user = await getAuthUser()

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
		<>
			<h1 className="mb-2 text-4xl font-bold tracking-tight">Billing</h1>

			{/* "relative mt-6 flex w-full flex-wrap justify-center gap-8 rounded-md py-6 md:mb-0 md:border md:px-6" */}
			<div className="mt-6 flex flex-col gap-4">
				<BillingForm
					subscriptionPlan={{
						...subscriptionPlan,
						isCanceled
					}}
				/>
			</div>
		</>
	)
}
