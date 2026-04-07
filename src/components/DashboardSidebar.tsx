'use client'

import { UserButton } from '@clerk/nextjs'
import { Wand2, BarChart3, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardSidebarProps {
  isOpen?: boolean
}

export function DashboardSidebar({ isOpen = true }: DashboardSidebarProps) {
  const menuItems = [
    { icon: Wand2, label: 'Generate', href: '/dashboard', active: true },
    { icon: BarChart3, label: 'Gallery', href: '/dashboard/gallery', active: false },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: false },
  ]

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-background via-background to-purple-950/20 border-r border-purple-500/20 backdrop-blur-xl z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            PostMultiplied
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              item.active
                ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-foreground'
                : 'text-foreground/70 hover:text-foreground hover:bg-background/40'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-purple-500/10 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-foreground/70 font-medium">Account</span>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-8 h-8'
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
