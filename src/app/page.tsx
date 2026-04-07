'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Users, Gauge } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Content',
    description: 'Transform your ideas into platform-perfect posts using advanced AI'
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get LinkedIn, X, Instagram, and TikTok content in seconds'
  },
  {
    icon: Users,
    title: 'Optimized for Each Platform',
    description: 'Each post is tailored to the unique voice and style of its platform'
  },
  {
    icon: Gauge,
    title: 'Track Your Usage',
    description: 'Monitor your credit usage and plan your content strategy'
  }
]

const pricingPlans = [
  {
    name: 'Free',
    price: '£0',
    period: 'Forever',
    credits: '3 total',
    features: ['3 total generations', 'Basic support', 'Community forum access'],
    cta: 'Get Started',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '£19.99',
    period: 'per month',
    credits: '50/month',
    features: ['50 generations per month', 'Priority support', 'Post history', 'Analytics dashboard'],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Agency',
    price: '£49.99',
    period: 'per month',
    credits: '150/month',
    features: ['150 generations per month', '24/7 support', 'Team collaboration', 'Advanced analytics', 'API access'],
    cta: 'Start Free Trial',
    highlighted: false
  }
]

const faqs = [
  {
    question: 'How do the credits work?',
    answer: 'Each generation uses 1 credit. Free plan gets 3 total credits, Pro gets 50/month, and Agency gets 150/month. Monthly credits reset on your billing date.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! You can cancel your subscription anytime. Your access continues until the end of your billing period.'
  },
  {
    question: 'What makes PostMultiplied different?',
    answer: 'We specialize in platform-specific optimization. Each post is tailored to the unique audience, tone, and format requirements of LinkedIn, X, Instagram, and TikTok.'
  },
  {
    question: 'Is there an API?',
    answer: 'API access is available for Agency plan members. Contact our team for more details about integration options.'
  }
]

export default function Home() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-foreground/70">AI-Powered Content Generation</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Turn 1 Idea Into<br />4 Perfect Posts
            </h1>

            <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
              PostMultiplied transforms your raw ideas into platform-optimized social media content for LinkedIn, X, Instagram, and TikTok—in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? '/dashboard' : '/sign-in'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-foreground hover:bg-background/40 transition-all duration-200"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 md:p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-foreground/60">AI-powered content generation in action</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-purple-500/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why PostMultiplied?</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Purpose-built for creators who need multi-platform content that actually converts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
                <div className="relative bg-background/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/40 transition">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 border-t border-purple-500/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-foreground/60">
              Start free. Upgrade when you need more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group ${plan.highlighted ? 'md:scale-105' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
                )}
                <div className={`relative bg-background/40 backdrop-blur-xl border rounded-2xl p-8 ${
                  plan.highlighted ? 'border-purple-500/40' : 'border-purple-500/20'
                }`}>
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-foreground/60 ml-2">{plan.period}</span>
                  </div>
                  <div className="mb-6 p-3 bg-background/40 rounded-lg border border-purple-500/20">
                    <p className="text-sm font-semibold text-cyan-400">{plan.credits}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg'
                      : 'border border-purple-500/20 text-foreground hover:bg-background/40'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 border-t border-purple-500/10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">{faq.question}</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-purple-500/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-2xl blur-xl" />
            <div className="relative bg-background/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your content?</h2>
              <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
                Join thousands of creators and marketers who are already using PostMultiplied to save hours on content creation
              </p>
              <Link
                href={user ? '/dashboard' : '/sign-in'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-200"
              >
                Start For Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
