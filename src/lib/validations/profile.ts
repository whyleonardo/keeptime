import { z } from 'zod'

export const profileSchema = z.object({
	username: z.string().min(3).max(15),
	fullname: z.string().min(3).max(20),
	website: z.union([
		z
			.string()
			.url('This URL is invalid. Please check if URL contains "https://"')
			.nullish(),
		z.literal('')
	])
})
