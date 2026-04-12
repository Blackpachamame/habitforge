const plans = [
  {
    id: "starter",
    name: "HabitForge Starter",
    price: "9.90",
    period: "mes",
    description: "Para empezar desde cero con estructura y claridad.",
    features: [
      "Plan base de 30 días",
      "Check-in diario",
      "Racha y progreso semanal",
      "Acceso al dashboard",
    ],
  },
  {
    id: "routine",
    name: "HabitForge Routine",
    price: "19.90",
    period: "mes",
    description: "Plan mensual personalizado según tus objetivos.",
    features: [
      "Todo lo de Starter",
      "Cuestionario personalizado",
      "Ajuste mensual del plan",
      "Soporte por email",
    ],
    highlighted: true,
  },
  {
    id: "challenge",
    name: "HabitForge Challenge",
    price: "14.90",
    period: "único",
    description: "Un reto de 21 días con un objetivo concreto.",
    features: [
      "Reto de 21 días",
      "Objetivo específico",
      "Guía de seguimiento",
      "Acceso ilimitado al contenido",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Elegí tu plan</h1>
        <p className="text-lg text-gray-500">Sin permanencia. Cancelás cuando querés.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-8 ${
              plan.highlighted
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-900"
            }`}>
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-2">{plan.name}</h2>
              <p className={`text-sm mb-4 ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                  /{plan.period}
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <span
                    className={`text-xs ${plan.highlighted ? "text-gray-400" : "text-gray-400"}`}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={`/register?plan=${plan.id}`}
              className={`text-center py-3 rounded-full text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}>
              Empezar con este plan
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
