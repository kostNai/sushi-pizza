/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'krababs-bucket.s3.amazonaws.com',
			'media.istockphoto.com'
		]
	},
	reactStrictMode: false
}
export default nextConfig
