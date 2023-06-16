/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'urnklphwrzijxoeynmvd.supabase.co',
			'cdn.discordapp.com'
		]
	}
}

export default nextConfig
