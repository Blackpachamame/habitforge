import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export default async function DashboardPage() {
  const clerkUser = await currentUser();

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", clerkUser?.id)
    .single();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Bienvenido, {clerkUser?.firstName ?? user?.email}
      </h1>

      <div className="mt-6 p-6 border border-gray-200 rounded-2xl max-w-sm">
        <p className="text-sm text-gray-500 mb-1">Tu plan actual</p>
        <p className="text-lg font-semibold capitalize">{user?.plan ?? "Sin plan"}</p>
        <p className="text-sm mt-2">
          Estado:{" "}
          <span className={user?.status === "active" ? "text-green-600" : "text-gray-400"}>
            {user?.status === "active" ? "Activo" : "Inactivo"}
          </span>
        </p>
      </div>
    </div>
  );
}
