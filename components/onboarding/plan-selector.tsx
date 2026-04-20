"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$9.90",
    period: "mes",
    description: "Para empezar a construir hábitos",
    features: ["Hasta 3 hábitos", "Check-in diario", "Estadísticas básicas"],
  },
  {
    id: "routine",
    name: "Routine",
    price: "$19.90",
    period: "mes",
    description: "Para quienes van en serio",
    features: ["Hábitos ilimitados", "Estadísticas avanzadas", "Recordatorios"],
    recommended: true,
  },
  {
    id: "challenge",
    name: "Challenge",
    price: "$14.90",
    period: "único",
    description: "Un desafío de 30 días",
    features: ["Programa guiado", "30 días de contenido", "Sin renovación"],
  },
];

export default function PlanSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/onboarding/checkout?plan=${selected}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`w-full text-left rounded-xl border-2 p-5 transition-all ${
              selected === plan.id
                ? "border-black bg-white shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{plan.name}</span>
                  {plan.recommended && (
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{plan.description}</p>
                <ul className="mt-3 space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm text-gray-400">/{plan.period}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full py-3 bg-black text-white rounded-xl font-medium 
                   disabled:opacity-40 disabled:cursor-not-allowed 
                   hover:bg-gray-800 transition-colors">
        Continuar con {selected ? plans.find((p) => p.id === selected)?.name : "..."}
      </button>
    </div>
  );
}
