import PlanSelector from "@/components/onboarding/plan-selector";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PlanPage() {
  const user = await currentUser();
  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Elegí tu plan</h1>
      <p className="text-center text-gray-500 mb-10">Podés cambiar o cancelar cuando quieras</p>
      <PlanSelector />
    </div>
  );
}
