import CancelButton from "@/components/dashboard/cancel-button";
import { supabaseAdmin } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();

  const { data: profile } = await supabaseAdmin
    .from("users")
    .select("plan, status")
    .eq("clerk_id", user?.id)
    .single();

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Mi perfil</h1>

      <section className="bg-white rounded-xl border p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user?.emailAddresses[0]?.emailAddress}</p>
        </div>

        {/* <div>
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-medium">
            {user?.firstName} {user?.lastName}
          </p>
        </div> */}

        <div>
          <p className="text-sm text-gray-500">Plan actual</p>
          <p className="font-medium capitalize">{profile?.plan ?? "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Estado</p>
          <p className="font-medium capitalize">{profile?.status ?? "—"}</p>
        </div>
      </section>

      <div className="mt-6">
        <CancelButton />
      </div>
    </div>
  );
}
