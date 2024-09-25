import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Read .env.local file directly
const envLocal = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
const envLocalApiKey = envLocal.match(/OPENAI_API_KEY=(.*)/)?.[1]

// Force set the API key
if (envLocalApiKey) {
  process.env.OPENAI_API_KEY = envLocalApiKey
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Startup Name Generator',
  description: 'Generate unique startup names with available domains',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}