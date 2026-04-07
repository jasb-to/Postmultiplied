import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface MagicInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  isLoading: boolean
  disabled?: boolean
  placeholder?: string
}

export function MagicInput({
  value,
  onChange,
  onGenerate,
  isLoading,
  disabled = false,
  placeholder = 'What would you like to turn into social media gold?'
}: MagicInputProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          className="w-full bg-transparent text-foreground placeholder-foreground/40 resize-none focus:outline-none min-h-24 text-base leading-relaxed"
        />
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-500/10">
          <div className="text-sm text-foreground/50">
            {value.length} characters
          </div>
          
          <motion.button
            onClick={onGenerate}
            disabled={disabled || isLoading || !value.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
          >
            <Wand2 className="w-4 h-4" />
            {isLoading ? 'Creating...' : 'Create Posts'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
