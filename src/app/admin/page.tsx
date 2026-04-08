'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Users, TrendingUp, CreditCard, Settings, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'

export const metadata = {
  title: 'Admin Dashboard | PostMultiplied',
  description: 'Admin dashboard for PostMultiplied management',
}

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'PostMultiplied2026!'

interface AdminStats {
  totalUsers: number
  activeSubscriptions: number
  totalRevenue: number
  generationsThisMonth: number
  avgGenerationsPerUser: number
  systemUptime: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [stats] = useState<AdminStats>({
    totalUsers: 1243,
    activeSubscriptions: 287,
    totalRevenue: 14350,
    generationsThisMonth: 24892,
    avgGenerationsPerUser: 20,
    systemUptime: 99.8,
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      toast.success('Admin access granted')
    } else {
      setError('Invalid credentials')
      toast.error('Login failed')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    toast.success('Logged out')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-3xl" style={{ zIndex: -1 }} />
          
          <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                PostMultiplied Admin
              </h1>
              <p className="text-foreground/60">Secure access required</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 bg-background/40 border border-purple-500/20 rounded-lg focus:border-purple-500/40 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 bg-background/40 border border-purple-500/20 rounded-lg focus:border-purple-500/40 focus:outline-none transition"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="mt-6 p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg">
              <p className="text-xs text-foreground/60"><strong>Demo Credentials:</strong></p>
              <p className="text-xs text-foreground/60 mt-1">Username: <code className="bg-background/40 px-2 py-0.5 rounded">admin</code></p>
              <p className="text-xs text-foreground/60">Password: <code className="bg-background/40 px-2 py-0.5 rounded">PostMultiplied2026!</code></p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      {/* Header */}
      <div className="border-b border-purple-500/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers.toLocaleString()}
            color="from-blue-600 to-blue-500"
          />
          <StatCard
            icon={CreditCard}
            label="Active Subscriptions"
            value={stats.activeSubscriptions.toString()}
            color="from-green-600 to-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Revenue This Month"
            value={`£${stats.totalRevenue.toLocaleString()}`}
            color="from-purple-600 to-purple-500"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={BarChart3}
            label="Generations This Month"
            value={stats.generationsThisMonth.toLocaleString()}
            color="from-cyan-600 to-cyan-500"
          />
          <StatCard
            icon={Users}
            label="Avg Generations/User"
            value={stats.avgGenerationsPerUser.toString()}
            color="from-amber-600 to-amber-500"
          />
          <StatCard
            icon={Settings}
            label="System Uptime"
            value={`${stats.systemUptime}%`}
            color="from-pink-600 to-pink-500"
          />
        </div>

        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AdminActionCard
            title="User Management"
            description="View, edit, and manage user accounts"
            icon="👥"
          />
          <AdminActionCard
            title="Subscription Analytics"
            description="View subscription trends and revenue data"
            icon="📊"
          />
          <AdminActionCard
            title="System Settings"
            description="Configure API keys and system parameters"
            icon="⚙️"
          />
          <AdminActionCard
            title="Support Tickets"
            description="Manage customer support requests"
            icon="🎫"
          />
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur opacity-30 group-hover:opacity-50 transition`} />
      <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-foreground/60 text-sm font-medium">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <Icon className={`w-8 h-8 text-transparent bg-gradient-to-r ${color} bg-clip-text`} />
        </div>
      </div>
    </motion.div>
  )
}

function AdminActionCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="text-left group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition" style={{ zIndex: -1 }} />
      <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-foreground/60 text-sm">{description}</p>
      </div>
    </motion.button>
  )
}
