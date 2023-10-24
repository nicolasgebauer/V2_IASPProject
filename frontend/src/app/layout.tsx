import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <head>
        </head>
      <body className={inter.className}>{children}</body>
    </html>

  )
}
