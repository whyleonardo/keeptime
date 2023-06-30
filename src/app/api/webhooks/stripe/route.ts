import { headers } from 'next/headers'

import { stripe } from '@/services/stripe'
import { sbServer as supabase } from '@/services/supabase/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
	const body = await req.text()
	const signature = headers().get('Stripe-Signature') as string

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
		)
	} catch (error: unknown) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignorets-ignore
		return new Response(`Webhook Error: ${error.message}`, {
			status: 400
		})
	}

	const session = event.data.object as Stripe.Checkout.Session

	if (event.type === 'checkout.session.completed') {
		// Retrieve the subscription details from Stripe.
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		)

		// Update the user stripe into in our database.
		// Since this is the initial subscription, we need to update
		// the subscription id and customer id.
		await supabase
			.from('profiles')
			.update({
				stripe_current_period_end: new Date(
					subscription.current_period_end * 1000
				) as unknown as string,
				stripe_subscription_id: subscription.id,
				stripe_price_id: subscription.items.data[0].price.id,
				stripe_customer_id: subscription.customer as string
			})
			.eq('id', session?.metadata?.userId)
			.select()
	}

	if (event.type === 'invoice.payment_succeeded') {
		// Retrieve the subscription details from Stripe.
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		)

		// Update the price id and set the new period end.

		await supabase
			.from('profiles')
			.update({
				stripe_current_period_end: new Date(
					subscription.current_period_end * 1000
				) as unknown as string,
				stripe_price_id: subscription.items.data[0].price.id
			})
			.eq('id', session?.metadata?.userId)
			.select()
	}

	return new Response(null, { status: 200 })
}
