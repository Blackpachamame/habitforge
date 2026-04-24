import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/about",
  "/login(.*)",
  "/register(.*)",
  "/api/webhooks(.*)",
  "/api/stripe(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Rutas públicas — dejar pasar
  if (isPublicRoute(request)) return;

  // No autenticado — proteger
  if (!userId) {
    await auth.protect();
    return;
  }

  // Consultar status del usuario en Supabase via fetch directo
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?id=eq.${userId}&select=status,plan`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    },
  );

  const [user] = await res.json();

  // Sin plan activo y no está en onboarding → redirigir
  if (user?.status !== "active" && !isOnboardingRoute(request)) {
    return NextResponse.redirect(new URL("/onboarding/plan", request.url));
  }

  // Con plan activo y quiere ir al onboarding → redirigir al dashboard
  if (user?.status === "active" && isOnboardingRoute(request)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
