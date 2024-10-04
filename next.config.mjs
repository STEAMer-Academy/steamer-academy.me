/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "steamer-academyme.netlify.app",
					},
				],
				destination: "https://www.steameracademy.me/:path*",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
