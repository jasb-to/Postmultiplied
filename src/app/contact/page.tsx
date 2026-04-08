'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Twitter } from 'lucide-react'

export const metadata = {
  title: 'Contact | PostMultiplied',
  description: 'Get in touch with the PostMultiplied team. We\'d love to hear from you.',
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-foreground/60">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
                <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Mail className="w-6 h-6 text-purple-400" />
                    <h3 className="font-semibold">Email</h3>
                  </div>
                  <a href="mailto:hello@postmultiplied.com" className="text-foreground/70 hover:text-foreground transition">
                    hello@postmultiplied.com
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
                <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Twitter className="w-6 h-6 text-cyan-400" />
                    <h3 className="font-semibold">Twitter/X</h3>
                  </div>
                  <a href="https://twitter.com/postmultiplied" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition">
                    @PostMultiplied
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
                <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                    <h3 className="font-semibold">LinkedIn</h3>
                  </div>
                  <a href="https://linkedin.com/company/postmultiplied" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition">
                    PostMultiplied
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
              <form className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-background/40 border border-purple-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-purple-500/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-background/40 border border-purple-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-purple-500/40"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full bg-background/40 border border-purple-500/20 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-purple-500/40 resize-none h-32"
                    placeholder="Your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg transition"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
