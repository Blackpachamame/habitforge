"use client";

import { useState } from "react";

export default function CancelButton() {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-3">
        <p className="text-sm text-red-700">
          ¿Seguro que querés cancelar? Tu plan seguirá activo hasta el final del período.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => alert("Próximamente — integración con Stripe")}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
            Sí, cancelar
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-red-500 hover:text-red-700 underline">
      Cancelar suscripción
    </button>
  );
}
