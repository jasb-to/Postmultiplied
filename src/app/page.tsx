"use client"
import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState({
    linkedin: '',
    twitter: '',
    instagram: '',
    tiktok: ''
  })

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
      })
      const data = await response.json()
      setGeneratedContent(data)
    } catch (error) {
      console.error('Error generating content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">PostMultiplied</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your raw text idea here..."
              className="w-full bg-gray-700 text-gray-100 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            
            <button
              onClick={handleGenerate}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Content'}
            </button>
          </div>

          {generatedContent.linkedin && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Generated Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContentCard
                  title="LinkedIn"
                  content={generatedContent.linkedin}
                  format="professional"
                />
                <ContentCard
                  title="Twitter"
                  content={generatedContent.twitter}
                  format="punchy"
                />
                <ContentCard
                  title="Instagram"
                  content={generatedContent.instagram}
                  format="aesthetic"
                />
                <ContentCard
                  title="TikTok"
                  content={generatedContent.tiktok}
                  format="script"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ContentCard({ title, content, format }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="prose prose-invert max-w-none">
        <p className={`text-gray-300 ${format === 'script' ? 'font-mono' : ''}`}>
          {content || 'Content will appear here after generation'}
        </p>
      </div>
    </div>
  )
}