'use client'

import { motion } from 'framer-motion'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-foreground/60">Last updated: April 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 prose prose-invert max-w-none"
          >
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Acceptance of Terms</h2>
              <p className="text-foreground/70 leading-relaxed">
                By accessing and using PostMultiplied, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">License</h2>
              <p className="text-foreground/70 leading-relaxed">
                PostMultiplied grants you a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes. You may not reverse engineer, disassemble, decompile, or otherwise modify the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">User Content</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                You retain all rights to any content you submit, post, or display on or through the service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Disclaimer of Warranties</h2>
              <p className="text-foreground/70 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIM AND NEGATE ALL OTHER WARRANTIES INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Limitation of Liability</h2>
              <p className="text-foreground/70 leading-relaxed">
                IN NO EVENT SHALL POSTMULTIPLIED, NOR ITS DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF OUR SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
              <p className="text-foreground/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at: legal@postmultiplied.com
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
