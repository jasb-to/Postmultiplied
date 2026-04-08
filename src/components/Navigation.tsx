'use client'

import Link from 'next/link'
import { SignIn, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-purple-500/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-lg font-bold text-white">✨</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            PostMultiplied
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-foreground/70 hover:text-foreground transition">
            Pricing
          </Link>
          <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition">
            How It Works
          </Link>
          <Link href="/gallery" className="text-foreground/70 hover:text-foreground transition">
            Gallery
          </Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg transition">
              Dashboard
            </Link>
          ) : (
            <Link href="/sign-in" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg transition">
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-purple-500/10 bg-background/95"
        >
          <div className="flex flex-col gap-4 p-6">
            <Link href="/pricing">Pricing</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
