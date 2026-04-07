'use client'

import { Linkedin, Twitter, Instagram, Music2, Copy, Check, Share2 } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ResultsTabsProps {
  results: {
    linkedin?: string
    twitter?: string
    instagram?: string
    tiktok?: string
  } | null
  isLoading?: boolean
}

const platforms = [
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'from-blue-600 to-blue-500' },
  { key: 'twitter', icon: Twitter, label: 'X (Twitter)', color: 'from-black to-gray-700' },
  { key: 'instagram', icon: Instagram, label: 'Instagram', color: 'from-pink-600 to-rose-600' },
  { key: 'tiktok', icon: Music2, label: 'TikTok', color: 'from-black to-gray-800' },
]

export function ResultsTabs({ results, isLoading }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState('linkedin')
  const [copied, setCopied] = useState(false)

  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/50">Generate content to see results here</p>
      </div>
    )
  }

  const activeResult = results[activeTab as keyof typeof results]

  const handleCopy = () => {
    navigator.clipboard.writeText(activeResult || '')
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Platform Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {platforms.map(({ key, icon: Icon, label, color }) => (
          <motion.button
            key={key}
            onClick={() => setActiveTab(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === key
                ? `bg-gradient-to-r ${color} text-white shadow-lg`
                : 'bg-background/40 border border-purple-500/20 text-foreground/70 hover:text-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Content Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
        
        <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {activeResult || 'No content generated for this platform'}
          </p>

          {activeResult && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-purple-500/10">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
