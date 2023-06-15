import { z } from 'zod'

export const memorySchema = z.object({
	title: z.string().min(3).max(30),
	is_public: z.boolean(),
	description: z.string().min(3).max(240),
	media: z.any()
})
