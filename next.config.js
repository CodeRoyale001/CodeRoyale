/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      JS_URI: process.env.JS_URI,
      GO_URI:process.env.GO_URI,
      COOKIES_SECRET: process.env.COOKIES_SECRET,
      COOKIES_EXPIRY_TIME: process.env.COOKIES_EXPIRY_TIME,
  },
  images: {
      domains: ['github.com'],
  },
}

module.exports = nextConfig
