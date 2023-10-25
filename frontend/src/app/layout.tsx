import type { Metadata } from 'next'

import './globals.css'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <body>{children}</body>
    </html>

  )
}
