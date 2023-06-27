require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
}

module.exports = nextConfig
