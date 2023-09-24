/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'http://159.65.218.149:3030/:path*',
          },
        ]
    },
    images: {
      domains: [''],
      path: '',
      loader: 'imgix',
    },
}

module.exports = nextConfig
