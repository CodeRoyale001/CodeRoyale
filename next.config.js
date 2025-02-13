/// <reference types="node" />
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      JS_URI: process.env.JS_URI,
      GO_URI:process.env.GO_URI,
      COOKIES_SECRET: process.env.COOKIES_SECRET,
      COOKIES_EXPIRY_TIME: process.env.COOKIES_EXPIRY_TIME,
      MM_URI: process.env.MM_URI,
      WSMM_URI: process.env.WSMM_URI,
  },
  images: {
      domains: ['github.com'],
  },
}

module.exports = nextConfig
