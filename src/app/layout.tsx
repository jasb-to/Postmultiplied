import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'PostMultiplied - AI Social Media Content Generator | Create Posts in Seconds',
  description: 'Turn 1 idea into 4 platform-optimized social media posts in seconds. AI-powered content for LinkedIn, X, Instagram, and TikTok. Start free today.',
  keywords: ['AI content generator', 'social media posts', 'LinkedIn content', 'Twitter content', 'Instagram posts', 'TikTok scripts', 'AI marketing', 'content creation tool', 'UK'],
  authors: [{ name: 'PostMultiplied' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://postmultiplied.com',
    title: 'PostMultiplied - AI Social Media Content Generator',
    description: 'Turn 1 idea into 4 platform-optimized posts in seconds',
    siteName: 'PostMultiplied',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostMultiplied - AI Social Media Content Generator',
    description: 'Transform your ideas into platform-perfect social media content',
  },
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
