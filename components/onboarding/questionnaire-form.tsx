"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "objetivo",
    label: "¿Cuál es tu objetivo principal?",
    options: [
      "Mejorar mi salud y energía",
      "Ser más productivo/a",
      "Hacer ejercicio con constancia",
      "Dormir mejor",
      "Otro",
    ],
  },
  {
    id: "dias_semana",
    label: "¿Cuántos días a la semana podés comprometerte?",
    options: ["2-3 días", "4-5 días", "Todos los días"],
  },
  {
    id: "momento_dia",
    label: "¿En qué momento del día preferís hacer tus hábitos?",
    options: ["Mañana", "Tarde", "Noche", "No tengo preferencia"],
  },
  {
    id: "nivel",
    label: "¿Cómo describirías tu nivel actual?",
    options: [
      "Empezando desde cero",
      "Tuve rutinas antes pero las abandoné",
      "Tengo algunos hábitos pero quiero mejorar",
    ],
  },
];

export default function QuestionnaireForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!res.ok) throw new Error("Error al guardar");

      router.push("/dashboard");
    } catch {
      setError("Algo salió mal. Intentá de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="bg-white rounded-xl border p-6">
          <p className="font-medium mb-4">{question.label}</p>
          <div className="grid gap-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                  answers[question.id] === option
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || loading}
        className="w-full py-3 bg-black text-white rounded-xl font-medium
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-gray-800 transition-colors">
        {loading ? "Guardando..." : "Ir al dashboard →"}
      </button>
    </div>
  );
}
