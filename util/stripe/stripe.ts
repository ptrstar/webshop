import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-10-29.clover', // Use your desired Stripe API version
});

export default stripe;