'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { MagicInput } from '@/components/MagicInput'
import { ResultsTabs } from '@/components/ResultsTabs'
import { MobilePreview } from '@/components/MobilePreview'
import { CreditsDisplay } from '@/components/CreditsDisplay'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

interface UserData {
  creditsUsed: number
  creditsLimit: number
  creditsRemaining: number
  plan: 'free' | 'pro' | 'agency'
}

interface Results {
  linkedin?: string
  twitter?: string
  instagram?: string
  tiktok?: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Results | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewPlatform, setPreviewPlatform] = useState<'linkedin' | 'twitter' | 'instagram' | 'tiktok'>('linkedin')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const { data: userData } = useSWR<UserData>('/api/user/profile', fetcher)

  useEffect(() => {
    if (results?.linkedin) setPreviewPlatform('linkedin')
  }, [results])

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error('Please enter some text to transform')
      return
    }

    setIsGenerating(true)
    setResults(null) // Clear previous results to show skeleton
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Generation failed')
      }

      const data = await response.json()
      setResults(data)
      setInput('')
      toast.success('✨ Generated')
      
      // Refresh user data to get updated credits
      mutate('/api/user/profile')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate posts'
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Please sign in</div>
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        {/* Header */}
        <div className="border-b border-purple-500/10 p-6 flex items-center justify-between bg-background/50 backdrop-blur">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-foreground/60 mt-1">Welcome back, {user.firstName}!</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-background/40 rounded-lg transition"
          >
            ☰
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Input */}
              <div className="lg:col-span-1">
                <MagicInput
                  value={input}
                  onChange={setInput}
                  onGenerate={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!userData || userData.creditsRemaining <= 0}
                />

                {/* Credits */}
                <div className="mt-6">
                  {userData && (
                    <CreditsDisplay
                      used={userData.creditsUsed}
                      limit={userData.creditsLimit}
                      plan={userData.plan}
                    />
                  )}
                </div>

                {/* Upgrade CTA */}
                {userData?.plan === 'free' && userData.creditsRemaining === 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-xl">
                    <p className="text-sm font-semibold text-foreground mb-3">Credits exhausted</p>
                    <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg transition">
                      Upgrade Plan
                    </button>
                  </div>
                )}
              </div>

              {/* Right column - Results */}
              <div className="lg:col-span-2 space-y-6">
                {/* Results Tabs */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-foreground">Generated Content</h2>
                  <ResultsTabs results={results} isLoading={isGenerating} />
                </div>

                {/* Mobile Preview */}
                {results && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Preview</h2>
                    <MobilePreview
                      platform={previewPlatform}
                      content={results[previewPlatform] || 'No content for this platform'}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
