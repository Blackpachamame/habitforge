import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Construí hábitos que duran
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Un plan personalizado, check-ins diarios y el progreso que necesitás ver para no
          abandonar.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/pricing"
            className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800">
            Ver planes
          </Link>
          <Link
            href="/about"
            className="border border-gray-300 px-8 py-3 rounded-full text-sm font-medium text-gray-700 hover:border-gray-500">
            Cómo funciona
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Plan personalizado",
            description:
              "Respondés un cuestionario inicial y recibís un plan adaptado a tu rutina y objetivos.",
          },
          {
            title: "Check-in diario",
            description:
              "Marcás tus hábitos cada día. La racha es lo que te mantiene en movimiento.",
          },
          {
            title: "Progreso visible",
            description:
              "Estadísticas semanales para que veas cuánto avanzaste y ajustés si hace falta.",
          },
        ].map((feature) => (
          <div key={feature.title} className="flex flex-col gap-3">
            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
