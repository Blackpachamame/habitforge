import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  routine: process.env.STRIPE_PRICE_ROUTINE!,
  challenge: process.env.STRIPE_PRICE_CHALLENGE!,
};

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("No autorizado", { status: 401 });

  const { plan } = await req.json();
  const priceId = PRICE_IDS[plan];

  if (!priceId) return new Response("Plan inválido", { status: 400 });

  const isRecurring = plan !== "challenge";

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/questionnaire?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/plan`,
    metadata: {
      clerk_id: userId,
      plan,
    },
  });

  return NextResponse.json({ url: session.url });
}
