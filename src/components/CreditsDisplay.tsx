'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

interface CreditsDisplayProps {
  used: number
  limit: number
  plan: 'free' | 'pro' | 'agency'
}

export function CreditsDisplay({ used, limit, plan }: CreditsDisplayProps) {
  const percentage = Math.min((used / limit) * 100, 100)
  
  const planLabel = {
    free: 'Free Plan',
    pro: 'Pro Plan',
    agency: 'Agency Plan'
  }

  const planColor = {
    free: 'from-gray-600 to-gray-500',
    pro: 'from-purple-600 to-purple-500',
    agency: 'from-cyan-600 to-blue-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75" />
      
      <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground/70">Generations</h3>
            <p className="text-xs text-foreground/50 mt-0.5">{planLabel[plan]}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${planColor[plan]} rounded-full`}>
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {limit - used === 0 ? 'Upgrade' : `${limit - used} ${limit - used === 1 ? 'left' : 'left'}`}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-background/40 border border-purple-500/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full"
          />
        </div>

        <div className="mt-3 text-xs text-foreground/50 flex justify-between">
          <span>{used} used</span>
          <span>{limit} total</span>
        </div>

        {used >= limit && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg"
          >
            <p className="text-xs text-amber-400 font-semibold">All generations used. Upgrade to continue!</p>
          </motion.div>
        )}

        {limit - used === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg"
          >
            <p className="text-xs text-purple-400 font-semibold">1 generation left. Time to upgrade?</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
