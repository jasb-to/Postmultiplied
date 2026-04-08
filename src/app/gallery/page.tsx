'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'

  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (response.ok) {
          const data = await response.json()
          setItems(data)
        }
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Public Gallery
            </h1>
            <p className="text-xl text-foreground/60">
              See what others are creating with PostMultiplied
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 mb-6">No posts in the gallery yet. Be the first!</p>
              <a
                href="/sign-in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg transition"
              >
                Start Creating
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
                  <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition">
                    <p className="text-sm text-foreground/60 mb-4">
                      {item.posts?.input_text.slice(0, 100)}...
                    </p>
                    <div className="space-y-2">
                      {item.posts?.linkedin && (
                        <p className="text-xs text-cyan-400 font-semibold">LinkedIn</p>
                      )}
                      {item.posts?.twitter && (
                        <p className="text-xs text-blue-400 font-semibold">X (Twitter)</p>
                      )}
                      {item.posts?.instagram && (
                        <p className="text-xs text-pink-400 font-semibold">Instagram</p>
                      )}
                      {item.posts?.tiktok && (
                        <p className="text-xs text-purple-400 font-semibold">TikTok</p>
                      )}
                    </div>
                    <p className="text-xs text-foreground/40 mt-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
