'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, Search, Home, User } from 'lucide-react'

interface MobilePreviewProps {
  platform: 'linkedin' | 'twitter' | 'instagram' | 'tiktok'
  content: string
}

export function MobilePreview({ platform, content }: MobilePreviewProps) {
  const renderPreview = () => {
    switch (platform) {
      case 'linkedin':
        return (
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="px-3 py-2.5 border-b flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-900">Your Name</div>
                <div className="text-xs text-gray-500">just now</div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <p className="text-xs leading-relaxed text-gray-900 line-clamp-6">{content}</p>
              <div className="mt-3 bg-gray-100 rounded text-xs p-2 text-gray-600">
                <div className="font-semibold mb-1">Your article title</div>
                <div className="text-gray-500">linkedin.com</div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-3 py-2.5 border-t flex justify-around text-gray-500">
              <button className="flex items-center gap-1 text-xs">👍 Like</button>
              <button className="flex items-center gap-1 text-xs">💬 Comment</button>
              <button className="flex items-center gap-1 text-xs">↗️ Share</button>
            </div>
          </div>
        )

      case 'twitter':
        return (
          <div className="flex flex-col h-full bg-black">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
              <Search className="w-4 h-4 text-gray-500" />
            </div>

            {/* Tweet */}
            <div className="flex gap-3 px-4 py-3 border-b border-gray-700 hover:bg-gray-900/50 cursor-pointer transition">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <div className="font-bold text-white text-sm">Your Handle</div>
                  <div className="text-gray-500 text-sm">@yourhandle</div>
                </div>
                <p className="text-white text-sm leading-relaxed mt-2 line-clamp-4">{content}</p>
                <div className="flex justify-around mt-3 text-gray-500 text-xs max-w-xs">
                  <div>💬 12</div>
                  <div>🔄 24</div>
                  <div>❤️ 48</div>
                  <div>📤</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'instagram':
        return (
          <div className="flex flex-col h-full bg-black">
            {/* Header */}
            <div className="px-3 py-3 border-b border-gray-700 flex items-center justify-between">
              <div className="font-bold text-white text-lg">instagram</div>
              <div className="text-white">❤️</div>
            </div>

            {/* Image */}
            <div className="w-full aspect-square bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-2xl mb-2">📸</div>
                <div className="text-xs">Image placeholder</div>
              </div>
            </div>

            {/* Interactions */}
            <div className="px-3 py-2 border-b border-gray-700 flex gap-3 text-gray-400">
              <Heart className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Share className="w-6 h-6" />
            </div>

            {/* Caption */}
            <div className="px-3 py-3 text-white text-sm">
              <div className="font-semibold mb-1">your_handle</div>
              <p className="line-clamp-3 text-gray-300">{content}</p>
            </div>
          </div>
        )

      case 'tiktok':
        return (
          <div className="flex flex-col h-full bg-black">
            {/* Video area */}
            <div className="flex-1 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-xs">Video</div>
              </div>
              
              {/* Right side actions */}
              <div className="absolute right-3 bottom-16 flex flex-col gap-4">
                <div className="text-center">
                  <Heart className="w-6 h-6 text-white mx-auto" />
                  <div className="text-xs text-white mt-1">342</div>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 text-white mx-auto" />
                  <div className="text-xs text-white mt-1">89</div>
                </div>
                <div className="text-center">
                  <Share className="w-6 h-6 text-white mx-auto" />
                  <div className="text-xs text-white mt-1">124</div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="px-3 py-2 text-white text-sm line-clamp-2">
              {content}
            </div>

            {/* Bottom nav */}
            <div className="flex justify-around text-gray-400 py-2 border-t border-gray-700">
              <Home className="w-6 h-6" />
              <Search className="w-6 h-6" />
              <div className="w-6 h-6">+</div>
              <MessageCircle className="w-6 h-6" />
              <User className="w-6 h-6" />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Phone frame */}
      <div className="bg-black rounded-3xl border-8 border-gray-900 shadow-2xl overflow-hidden w-full max-w-xs mx-auto aspect-video flex flex-col">
        {/* Notch */}
        <div className="h-2 bg-black" />
        {renderPreview()}
      </div>
    </motion.div>
  )
}
