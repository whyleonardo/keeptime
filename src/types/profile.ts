export type Profile =
	| {
			avatar_url: string | null
			email: string | null
			full_name: string | null
			id: string
			updated_at: string | null
			username: string | null
			website: string | null | undefined
	  }
	| undefined
	| null
