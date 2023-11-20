// require("dotenv").config()
/** @type {import('next').NextConfig} */

let config = {
  experimental: {
    serverActions: true
  }
}

if (process.env.NODE_ENV === "development") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  })
  config = withBundleAnalyzer(config)
}

module.exports = config
