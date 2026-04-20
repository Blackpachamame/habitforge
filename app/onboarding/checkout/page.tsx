import { Suspense } from "react";
import CheckoutPage from "./checkout-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
