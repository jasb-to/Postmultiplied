'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-foreground/60">Last updated: April 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 prose prose-invert max-w-none"
          >
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Introduction</h2>
              <p className="text-foreground/70 leading-relaxed">
                PostMultiplied (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the PostMultiplied website and service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Information Collection and Use</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <ul className="space-y-2 text-foreground/70">
                <li>• Account Information: When you create an account, we collect your email address and name</li>
                <li>• Usage Data: We collect information about how you interact with our service, including timestamps, features used, and content generated</li>
                <li>• Payment Information: Handled securely by Stripe; we don&apos;t store your payment card details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Use of Data</h2>
              <p className="text-foreground/70 leading-relaxed">
                PostMultiplied uses the collected data for various purposes including: providing and maintaining our service, notifying you about changes, allowing you to participate in interactive features, and improving our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Security of Data</h2>
              <p className="text-foreground/70 leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
              <p className="text-foreground/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at: privacy@postmultiplied.com
              </p>
            </section>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
