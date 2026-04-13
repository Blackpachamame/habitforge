"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import type { Habit, Checkin } from "@/types";

export default function CheckinPage() {
  const queryClient = useQueryClient();

  const { data: habits = [], isLoading: habitsLoading } = useQuery<Habit[]>({
    queryKey: queryKeys.habits.all("me"),
    queryFn: () => fetch("/api/habits").then((r) => r.json()),
  });

  const { data: checkins = [] } = useQuery<Checkin[]>({
    queryKey: queryKeys.checkins.week("me"),
    queryFn: () => fetch("/api/checkins").then((r) => r.json()),
  });

  const today = new Date().toISOString().split("T")[0];

  const completedToday = new Set(checkins.filter((c) => c.date === today).map((c) => c.habit_id));

  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: (habitId: string) =>
      fetch("/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit_id: habitId }),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.checkins.week("me"),
      });
    },
  });

  if (habitsLoading) {
    return <div className="p-8 text-gray-500 text-sm">Cargando hábitos...</div>;
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check-in diario</h1>
      <p className="text-sm text-gray-500 mb-8">
        {completedToday.size} de {habits.length} hábitos completados hoy
      </p>

      <div className="flex flex-col gap-3">
        {habits.map((habit) => {
          const done = completedToday.has(habit.id);

          return (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                done ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
              }`}>
              <div>
                <p className={`font-medium text-sm ${done ? "text-green-800" : "text-gray-900"}`}>
                  {habit.name}
                </p>
                {habit.description && (
                  <p className="text-xs text-gray-400 mt-0.5">{habit.description}</p>
                )}
              </div>

              <button
                onClick={() => !done && checkIn(habit.id)}
                disabled={done || isPending}
                className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                  done
                    ? "bg-green-100 text-green-700 cursor-default"
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                }`}>
                {done ? "Listo" : "Completar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
