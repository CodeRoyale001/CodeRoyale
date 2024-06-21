/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      JS_URI: process.env.JS_URI,
      GO_URI:process.env.GO_URI
  },
  images: {
      domains: ['github.com'],
  },
}

module.exports = nextConfig
