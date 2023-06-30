// import { absoluteUrl } from '@/lib/utils'
import { stripe } from '@/services/stripe'
import { getUserSubscriptionPlan } from '@/services/stripe/subscription'
import { proPlan } from '@/services/stripe/subscriptions'
import { sbServer as supabase } from '@/services/supabase/server'
import { z } from 'zod'

const billingUrl = 'http://localhost:3000/dashboard/billing'

export async function GET(req: Request) {
	try {
		const user = (await supabase.auth.getUser()).data.user
		if (!user || !user.email) {
			return new Response(null, { status: 403 })
		}

		const subscriptionPlan = await getUserSubscriptionPlan(user.id)

		// The user is on the pro plan.
		// Create a portal session to manage subscription.
		if (subscriptionPlan.isPro && subscriptionPlan.stripe_customer_id) {
			const stripeSession = await stripe.billingPortal.sessions
				.create({
					customer: subscriptionPlan.stripe_customer_id,
					return_url: billingUrl
				})
				.catch((error) => {
					console.log(error)
				})

			return new Response(JSON.stringify({ url: stripeSession?.url }))
		}

		// The user is on the free plan.
		// Create a checkout session to upgrade.
		const stripeSession = await stripe.checkout.sessions.create({
			success_url: billingUrl,
			cancel_url: billingUrl,
			payment_method_types: ['card'],
			mode: 'subscription',
			billing_address_collection: 'auto',
			customer_email: user.email,
			line_items: [
				{
					price: proPlan.stripePriceId,
					quantity: 1
				}
			],
			metadata: {
				userId: user.id
			}
		})

		return new Response(JSON.stringify({ url: stripeSession.url }))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 })
		}

		return new Response(null, { status: 500 })
	}
}
