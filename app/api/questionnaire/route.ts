import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("No autorizado", { status: 401 });

  const { objetivo, dias_semana, momento_dia, nivel } = await req.json();

  if (!objetivo || !dias_semana || !momento_dia || !nivel) {
    return new Response("Faltan respuestas", { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("questionnaire_responses")
    .insert({ user_id: userId, objetivo, dias_semana, momento_dia, nivel });

  if (error) {
    console.error("Error guardando cuestionario:", error);
    return new Response("Error en DB", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
