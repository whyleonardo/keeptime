import { z } from 'zod'

export const profileSchema = z.object({
	username: z.string().min(2).max(15),
	bio: z.string().max(120, 'Bio must contain at most 120 character(s)'),
	avatar: z.any(),
	fullname: z.string().min(2).max(18),
	website: z.union([
		z
			.string()
			.url('This URL is invalid. Please check if URL contains "https://"')
			.nullish(),
		z.literal('')
	])
})
