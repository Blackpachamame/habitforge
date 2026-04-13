import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("No autorizado", { status: 401 });

  const { data, error } = await supabaseAdmin.from("habits").select("*").eq("user_id", userId);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}
