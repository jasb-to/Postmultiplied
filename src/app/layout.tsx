import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'PostMultiplied - AI Social Media Content Generator',
  description: 'Turn 1 idea into 4 platform-optimized posts in seconds. LinkedIn, X, Instagram, TikTok.',
  keywords: ['AI', 'Social Media', 'Content Generation', 'Marketing', 'UK'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
          {children}
          <Toaster
            position="top-right"
            expand={false}
            richColors
            theme="dark"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
