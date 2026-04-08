'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-purple-500/10 bg-background/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                PostMultiplied
              </span>
            </div>
            <p className="text-sm text-foreground/60">
              Turn 1 idea into 4 platform-optimized posts in seconds
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/features" className="hover:text-foreground transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="/how-it-works" className="hover:text-foreground transition">How It Works</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/privacy" className="hover:text-foreground transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">
            © {currentYear} PostMultiplied. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-foreground transition">Twitter</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition">LinkedIn</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
