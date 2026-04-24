import QuestionnaireForm from "@/components/onboarding/questionnaire-form";

export default function QuestionnairePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Contanos sobre vos</h1>
      <p className="text-center text-gray-500 mb-10">
        Esto nos ayuda a personalizar tu experiencia
      </p>
      <QuestionnaireForm />
    </div>
  );
}
