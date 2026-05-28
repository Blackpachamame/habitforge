# HabitForge

SaaS de hábitos personalizados. Incluye autenticación, onboarding con pagos, y dashboard de seguimiento diario.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Clerk
- **Base de datos**: Supabase (PostgreSQL)
- **Pagos**: Stripe
- **Estado global**: Zustand
- **Data fetching**: TanStack Query
- **Deploy**: Vercel

## Requisitos

- Node.js 18+
- Cuenta en Clerk
- Cuenta en Supabase
- Cuenta en Stripe

## Variables de entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER=
STRIPE_PRICE_ROUTINE=
STRIPE_PRICE_CHALLENGE=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Instalación

```bash
git clone https://github.com/tu-usuario/habitforge.git
cd habitforge
npm install
npm run dev
```

## Webhooks

### Clerk
Configurá un webhook en el dashboard de Clerk apuntando a:
```
https://tu-app.vercel.app/api/webhooks/clerk
```
Evento requerido: `user.created`

### Stripe
Configurá un webhook en el dashboard de Stripe apuntando a:
```
https://tu-app.vercel.app/api/webhooks/stripe
```
Evento requerido: `checkout.session.completed`

Para desarrollo local, usá el CLI de Stripe:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Flujo de usuario

```
Registro → /onboarding/plan → /onboarding/checkout (Stripe) → /onboarding/questionnaire → /dashboard
```

El proxy (`proxy.ts`) redirige automáticamente a usuarios con `status: inactive` al onboarding y bloquea el acceso al dashboard hasta completar el pago.

## Estructura del proyecto

```
app/
  (dashboard)/         # Layout con sidebar
    dashboard/
    dashboard/checkin/
    dashboard/profile/
    dashboard/progress/
  (marketing)/         # Layout público
    page.tsx           # Landing
    pricing/
    about/
  (auth)/
    login/
    register/
  onboarding/
    plan/
    checkout/
    questionnaire/
  api/
    checkins/
    habits/
    questionnaire/
    stripe/checkout/
    webhooks/clerk/
    webhooks/stripe/
components/
  dashboard/
  onboarding/
  ui/
lib/
  supabase.ts
  plans.ts
stores/
  ui.store.ts
types/
  index.ts
proxy.ts
```
