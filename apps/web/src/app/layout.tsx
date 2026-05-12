import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adamantium',
  description: 'Institutional Operational Coordination Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}