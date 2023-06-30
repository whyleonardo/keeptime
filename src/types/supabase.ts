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
					media: string | null
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
					media?: string | null
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
					media?: string | null
					media_path?: string | null
					title?: string
					user_id?: string
					wishlist?: string[] | null
				}
				Relationships: [
					{
						foreignKeyName: 'memories_media_fkey'
						columns: ['media']
						referencedRelation: 'objects'
						referencedColumns: ['id']
					}
				]
			}
			profiles: {
				Row: {
					avatar_url: string | null
					created_at: string | null
					email: string | null
					full_name: string | null
					id: string
					stripe_current_period_end: string | null
					stripe_customer_id: string
					stripe_price_id: string
					stripe_subscription_id: string
					updated_at: string | null
					username: string | null
					website: string | null
				}
				Insert: {
					avatar_url?: string | null
					created_at?: string | null
					email?: string | null
					full_name?: string | null
					id: string
					stripe_current_period_end?: string | null
					stripe_customer_id?: string
					stripe_price_id?: string
					stripe_subscription_id?: string
					updated_at?: string | null
					username?: string | null
					website?: string | null
				}
				Update: {
					avatar_url?: string | null
					created_at?: string | null
					email?: string | null
					full_name?: string | null
					id?: string
					stripe_current_period_end?: string | null
					stripe_customer_id?: string
					stripe_price_id?: string
					stripe_subscription_id?: string
					updated_at?: string | null
					username?: string | null
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
