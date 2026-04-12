import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Bienvenido, {user?.firstName ?? user?.emailAddresses[0].emailAddress}
      </h1>
      <p className="text-gray-500">Tu dashboard está en construcción.</p>
    </div>
  );
}
