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
        ]
    }
}

module.exports = nextConfig
