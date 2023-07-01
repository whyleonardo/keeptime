const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string

export const absolutePath = (path: string) => {
	return baseUrl + path
}
