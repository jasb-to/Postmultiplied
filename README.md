# PostMultiplied - AI Social Media Content Generator

A powerful SaaS application that transforms your ideas into platform-optimized social media content for LinkedIn, X (Twitter), Instagram, and TikTok in seconds.

## 🚀 Features

- **AI-Powered Content Generation**: Uses OpenAI GPT-4 to create platform-specific content
- **Multi-Platform Optimization**: Each post is tailored to the unique voice and audience of its platform
- **User Billing System**: Free tier with 3 credits, Pro ($19.99/mo) with 50 credits, Agency ($49.99/mo) with 150 credits
- **Dark Mode Interface**: Beautiful dark-themed dashboard with neon purple and cyan accents
- **Glassmorphism Design**: Modern UI with backdrop blur effects and smooth animations
- **Authentication**: Clerk integration with email and social login support
- **Secure Database**: Supabase with Row Level Security (RLS) for multi-tenant data isolation

## 📋 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Authentication**: Clerk
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe (GBP billing)
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Supabase project
- Clerk project
- OpenAI API key
- Stripe account

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Required Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `OPENAI_API_KEY` - OpenAI API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- Stripe product IDs and price IDs for Pro and Agency plans

### 2. Database Setup

The database schema is automatically created by the migration script. If needed, run:

```bash
# The SQL schema is in scripts/01-create-schema.sql
# Execute it in your Supabase SQL editor
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout with Clerk provider
│   ├── dashboard/
│   │   └── page.tsx             # Main dashboard
│   ├── api/
│   │   ├── generate/            # Content generation endpoint
│   │   ├── user/                # User profile and posts endpoints
│   │   ├── stripe/              # Stripe checkout endpoint
│   │   ├── webhooks/            # Stripe webhook handler
│   │   └── gallery/             # Public gallery endpoint
│   ├── pricing/                 # Pricing page
│   ├── how-it-works/            # How it works guide
│   ├── gallery/                 # Public gallery page
│   ├── privacy/                 # Privacy policy
│   ├── terms/                   # Terms of service
│   └── contact/                 # Contact page
├── components/
│   ├── Navigation.tsx           # Top navigation
│   ├── Footer.tsx               # Footer
│   ├── MagicInput.tsx           # Content input component
│   ├── ResultsTabs.tsx          # Results display tabs
│   ├── MobilePreview.tsx        # Platform preview
│   ├── CreditsDisplay.tsx       # Credit tracking
│   └── DashboardSidebar.tsx     # Dashboard sidebar
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── db.ts                    # Database helpers
│   └── stripe.ts                # Stripe utilities
└── globals.css                  # Design tokens and global styles
```

## 💳 Billing Plans

### Free
- 3 total generations (lifetime)
- All 4 platforms
- Community support

### Pro
- 50 generations per month
- All 4 platforms
- Priority support
- Post history
- Usage analytics

### Agency
- 150 generations per month
- All 4 platforms
- 24/7 support
- Advanced analytics
- Team collaboration
- API access

## 🔐 Security Features

- **Row Level Security (RLS)**: Database tables protected with RLS policies
- **Clerk Authentication**: Secure user authentication with email verification
- **HTTPS Only**: All communications encrypted
- **API Rate Limiting**: Protect against abuse
- **Input Validation**: All user inputs validated and sanitized
- **Credit System**: Prevents unauthorized usage

## 📊 Database Schema

### users
- id (Clerk user ID)
- email
- plan (free | pro | agency)
- credits_used / credits_limit
- stripe_customer_id
- stripe_subscription_id
- current_period_end
- created_at

### posts
- id (UUID)
- user_id (foreign key)
- input_text
- linkedin, twitter, instagram, tiktok (generated content)
- created_at

### public_gallery
- id (UUID)
- post_id (foreign key)
- user_id
- created_at

## 🚀 Deployment

### Deploy to Vercel

1. Push your repository to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
vercel deploy
```

### Production Checklist

- [ ] Set environment variables in production
- [ ] Configure Stripe webhook URLs
- [ ] Configure Clerk social logins
- [ ] Test Stripe payments in live mode
- [ ] Set up monitoring/logging
- [ ] Enable CORS appropriately
- [ ] Configure custom domain

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support, email support@postmultiplied.com or open an issue on GitHub.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for hosting
- Supabase for database
- Stripe for payments
- Clerk for authentication

---

Built with love for content creators everywhere.
