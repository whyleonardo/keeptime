import { Database } from '@/types/supabase'

export type User = Database['public']['Tables']['profiles']['Row']

export type SubscriptionPlan = {
	name: string
	description: string
	stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
	Pick<User, 'stripe_customer_id' | 'stripe_subscription_id'> & {
		stripeCurrentPeriodEnd: number
		isPro: boolean
	}
