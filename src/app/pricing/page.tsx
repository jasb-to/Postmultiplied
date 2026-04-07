'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

const pricingTiers = [
  {
    name: 'Free',
    price: '£0',
    description: 'Perfect for getting started',
    credits: '3 total',
    features: ['3 total generations', 'All 4 platforms', 'Basic support', 'Community access'],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '£19.99',
    billingCycle: '/month',
    description: 'For regular content creators',
    credits: '50/month',
    features: ['50 generations per month', 'All 4 platforms', 'Priority support', 'Post history', 'Usage analytics', 'Credit rollover up to 100'],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Agency',
    price: '£49.99',
    billingCycle: '/month',
    description: 'For teams and agencies',
    credits: '150/month',
    features: ['150 generations per month', 'All 4 platforms', '24/7 support', 'Advanced analytics', 'Team collaboration', 'API access', 'Custom integrations'],
    cta: 'Start Free Trial',
    highlighted: false
  }
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              No hidden fees. Start free and upgrade anytime as your content needs grow
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group ${tier.highlighted ? 'md:scale-105' : ''}`}
              >
                {tier.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-2xl blur-xl" />
                )}
                <div className={`relative bg-background/40 backdrop-blur-xl border rounded-2xl p-8 h-full flex flex-col ${
                  tier.highlighted ? 'border-purple-500/40' : 'border-purple-500/20'
                }`}>
                  {tier.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{tier.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold">{tier.price}</span>
                        {tier.billingCycle && <span className="text-foreground/60">{tier.billingCycle}</span>}
                      </div>
                    </div>

                    <div className="p-3 bg-background/40 rounded-lg border border-purple-500/20">
                      <p className="text-sm font-semibold text-cyan-400">{tier.credits} credits</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/70">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mt-0.5">
                          <span className="text-xs text-white">✓</span>
                        </span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/sign-in"
                    className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                        : 'border border-purple-500/20 text-foreground hover:bg-background/40'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Pricing FAQs</h2>
            
            <div className="space-y-4">
              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">What happens when I run out of credits?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  If you&apos;re on a paid plan, your credits reset on your billing date. If you&apos;re on the Free plan and run out of credits, you&apos;ll need to upgrade to continue generating content.
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">Can I switch plans anytime?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  Yes! You can upgrade, downgrade, or cancel your subscription anytime. If you upgrade mid-cycle, you'll be prorated. If you downgrade, the change takes effect at your next billing date.
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">Do unused credits roll over?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  Pro plan members can roll over unused credits up to 100. Agency plan members can roll over up to 200. Free plan credits do not roll over.
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex items-center justify-between p-6 bg-background/40 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition">
                  <span className="font-semibold">Is there a discount for annual billing?</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="p-6 border border-t-0 border-purple-500/20 rounded-b-xl bg-background/20 text-foreground/70">
                  We currently offer monthly billing. Contact our sales team for enterprise pricing and custom arrangements.
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
