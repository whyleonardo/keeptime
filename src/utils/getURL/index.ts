export const getURL = () => {
	let url =
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_SITE_URL
			: 'http://localhost:3000/dashboard'

	if (!url) return null

	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
	return url
}
