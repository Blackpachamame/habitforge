import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          HabitForge
        </Link>

        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800">
              Empezar
            </Link>
          </Show>

          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        © 2025 HabitForge. Todos los derechos reservados.
      </footer>
    </div>
  );
}
