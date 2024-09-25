/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAMECHEAP_API_USER: process.env.NAMECHEAP_API_USER,
    NAMECHEAP_API_KEY: process.env.NAMECHEAP_API_KEY,
    NAMECHEAP_USERNAME: process.env.NAMECHEAP_USERNAME,
    NAMECHEAP_CLIENT_IP: process.env.NAMECHEAP_CLIENT_IP,
  },
}

module.exports = nextConfig