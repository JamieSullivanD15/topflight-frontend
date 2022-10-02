/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['topflight-assessment.s3-website.us-east-2.amazonaws.com']
  }
}

module.exports = nextConfig
