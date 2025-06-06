import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Outfit } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dietify',
  description: 'Loose weight not cravings',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" className='dark'>
        <body className={`${geistSans.variable} ${geistMono.variable} ${outfit} antialiased`}>
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
  )
}