import { useState } from 'react'
import { Wand2, RotateCcw } from 'lucide-react'
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
  const [showModifiers, setShowModifiers] = useState(false)

  const modifiers = [
    { label: 'Shorter', emoji: '✏️' },
    { label: 'More engaging', emoji: '⚡' },
    { label: 'Professional', emoji: '💼' },
    { label: 'Casual', emoji: '😄' },
  ]

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
        
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-foreground/50">
              {value.length} characters
            </div>
            
            <div className="flex gap-2">
              {showModifiers && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2 flex-wrap justify-end mb-2"
                >
                  {modifiers.map(({ label, emoji }) => (
                    <motion.button
                      key={label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-full hover:bg-purple-600/30 transition"
                    >
                      {emoji} {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <motion.button
              onClick={() => setShowModifiers(!showModifiers)}
              disabled={disabled || isLoading || !value.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-background/40 border border-purple-500/30 rounded-full font-medium text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:text-foreground transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Refine
            </motion.button>

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
    </div>
  )
}
