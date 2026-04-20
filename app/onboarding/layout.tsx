export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-12">
        {/* Indicador de progreso — lo agregamos después */}
        {children}
      </div>
    </div>
  );
}
