/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'http://178.128.57.26:3030/:path*',
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
