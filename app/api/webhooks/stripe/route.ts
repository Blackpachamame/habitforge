import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const signature = headerPayload.get("stripe-signature");

  if (!signature) {
    return new Response("Firma faltante", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("Firma inválida", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkId = session.metadata?.clerk_id;
    const plan = session.metadata?.plan;

    if (!clerkId || !plan) {
      return new Response("Metadata faltante", { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({ plan, status: "active" })
      .eq("clerk_id", clerkId);

    if (error) {
      console.error("Error actualizando usuario:", error);
      return new Response("Error en DB", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}
