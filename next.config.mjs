/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'krababs-bucket.s3.amazonaws.com'
			},
			{
				protocol: 'https',
				hostname: 'media.istockphoto.com'
			}
		]
	},
	reactStrictMode: false
}
export default nextConfig
