"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PLAN_NAMES: Record<string, string> = {
  starter: "Starter — $9.90/mes",
  routine: "Routine — $19.90/mes",
  challenge: "Challenge — $14.90 único",
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("plan:", plan);
  useEffect(() => {
    if (!plan || !PLAN_NAMES[plan]) {
      router.replace("/onboarding/plan");
    }
  }, [plan, router]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Error al crear sesión");

      window.location.href = data.url; // redirige a Stripe
    } catch (err) {
      setError("Algo salió mal. Intentá de nuevo.");
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Confirmá tu plan</h1>
        <p className="text-gray-500">Serás redirigido a Stripe para completar el pago</p>
      </div>

      <div className="bg-white rounded-xl border p-6 text-left space-y-3">
        <p className="text-sm text-gray-500">Plan seleccionado</p>
        <p className="text-xl font-semibold">{PLAN_NAMES[plan]}</p>
        <p className="text-sm text-gray-400">Podés cancelar cuando quieras desde tu perfil</p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-xl font-medium 
                     disabled:opacity-40 hover:bg-gray-800 transition-colors">
          {loading ? "Redirigiendo..." : "Ir al pago →"}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-3 text-sm text-gray-500 hover:text-gray-700">
          ← Cambiar plan
        </button>
      </div>
    </div>
  );
}
