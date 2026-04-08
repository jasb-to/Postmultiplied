'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Enter Your Idea',
      description: 'Write down your raw idea or talking points in the input field'
    },
    {
      number: '2',
      title: 'Click Generate',
      description: 'Our AI analyzes your content and creates platform-specific versions'
    },
    {
      number: '3',
      title: 'Review Results',
      description: 'See optimized versions for LinkedIn, X, Instagram, and TikTok'
    },
    {
      number: '4',
      title: 'Copy & Share',
      description: 'Copy to clipboard and post to your favorite platforms instantly'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              How PostMultiplied Works
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Transform one idea into four perfectly optimized social media posts in just four simple steps
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
                <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            
            <div className="space-y-4">
              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">What if I don&apos;t like the generated content?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  You can regenerate as many times as you like. Each generation uses one credit, but you can try different approaches, angles, and phrasings until you get the perfect result.
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">Can I edit the generated content?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  Absolutely! Copy the generated content to your clipboard and edit as needed before posting. We just provide the starting point—your personal touch makes it unique.
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">What types of content work best?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  PostMultiplied works great for industry insights, tips, announcements, and thought leadership. Be specific and provide context for the best results—the more detail you provide, the better the output.
                </div>
              </details>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="relative p-12 bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-lg transition"
              >
                Create Your Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
