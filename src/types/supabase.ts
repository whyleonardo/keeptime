export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
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
					title: string
					user_id: string
				}
				Insert: {
					created_at?: string
					description?: string | null
					id?: string
					is_public?: boolean
					title: string
					user_id: string
				}
				Update: {
					created_at?: string
					description?: string | null
					id?: string
					is_public?: boolean
					title?: string
					user_id?: string
				}
			}
			profiles: {
				Row: {
					avatar_url: string | null
					email: string | null
					full_name: string | null
					id: string
					updated_at: string | null
					username: string | null
					website: string | null
				}
				Insert: {
					avatar_url?: string | null
					email?: string | null
					full_name?: string | null
					id: string
					updated_at?: string | null
					username?: string | null
					website?: string | null
				}
				Update: {
					avatar_url?: string | null
					email?: string | null
					full_name?: string | null
					id?: string
					updated_at?: string | null
					username?: string | null
					website?: string | null
				}
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
