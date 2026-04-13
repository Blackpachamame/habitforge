import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("No autorizado", { status: 401 });

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const { data, error } = await supabaseAdmin
    .from("checkins")
    .select("*")
    .eq("user_id", userId)
    .gte("date", weekAgo.toISOString().split("T")[0]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("No autorizado", { status: 401 });

  const { habit_id } = await req.json();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabaseAdmin
    .from("checkins")
    .insert({ user_id: userId, habit_id, date: today })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}
