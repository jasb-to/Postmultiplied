import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const PRICING_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    credits: 3,
    features: ['3 total generations', 'Basic support'],
  },
  pro: {
    name: 'Pro',
    price: 1999, // £19.99 in pence
    credits: 50,
    features: ['50 generations/month', 'Priority support', 'Post history'],
    stripeProductId: process.env.STRIPE_PRO_PRODUCT_ID,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  agency: {
    name: 'Agency',
    price: 4999, // £49.99 in pence
    credits: 150,
    features: ['150 generations/month', '24/7 support', 'Analytics', 'Team collaboration'],
    stripeProductId: process.env.STRIPE_AGENCY_PRODUCT_ID,
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID,
  },
};

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: 'pro' | 'agency',
  baseUrl: string
) {
  const planConfig = PRICING_PLANS[plan];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price: planConfig.stripePriceId!,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${baseUrl}/dashboard?success=true`,
    cancel_url: `${baseUrl}/pricing?cancelled=true`,
    metadata: {
      userId,
      plan,
    },
  });

  return session;
}

export async function handleSubscriptionUpdate(
  session: Stripe.Checkout.Session
) {
  const { metadata, subscription } = session;

  if (!metadata || !subscription) return;

  const sub = await stripe.subscriptions.retrieve(subscription as string);
  
  return {
    userId: metadata.userId,
    plan: metadata.plan,
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: sub.id,
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
  };
}
