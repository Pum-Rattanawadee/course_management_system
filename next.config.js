/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/auth',
            destination: 'http://localhost:3030/auth',
          },
          {
            source: '/course',
            destination: 'http://localhost:3030/course',
          },
          {
            source: '/course/upload',
            destination: 'http://localhost:3030/course/upload',
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
