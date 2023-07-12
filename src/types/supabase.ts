export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			memories: {
				Row: {
					created_at: string
					description: string | null
					id: string
					is_public: boolean
					media_path: string | null
					title: string
					user_id: string
					wishlist: string[] | null
				}
				Insert: {
					created_at?: string
					description?: string | null
					id?: string
					is_public?: boolean
					media_path?: string | null
					title: string
					user_id: string
					wishlist?: string[] | null
				}
				Update: {
					created_at?: string
					description?: string | null
					id?: string
					is_public?: boolean
					media_path?: string | null
					title?: string
					user_id?: string
					wishlist?: string[] | null
				}
				Relationships: []
			}
			profiles: {
				Row: {
					avatar_url: string | null
					bio: string | null
					created_at: string | null
					email: string | null
					full_name: string
					id: string
					stripe_current_period_end: string | null
					stripe_customer_id: string
					stripe_price_id: string
					stripe_subscription_id: string
					username: string
					website: string | null
				}
				Insert: {
					avatar_url?: string | null
					bio?: string | null
					created_at?: string | null
					email?: string | null
					full_name: string
					id: string
					stripe_current_period_end?: string | null
					stripe_customer_id?: string
					stripe_price_id?: string
					stripe_subscription_id?: string
					username: string
					website?: string | null
				}
				Update: {
					avatar_url?: string | null
					bio?: string | null
					created_at?: string | null
					email?: string | null
					full_name?: string
					id?: string
					stripe_current_period_end?: string | null
					stripe_customer_id?: string
					stripe_price_id?: string
					stripe_subscription_id?: string
					username?: string
					website?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
