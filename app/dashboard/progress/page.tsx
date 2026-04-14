"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import type { Checkin } from "@/types";

function getWeekDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export default function ProgressPage() {
  const { data: checkins = [], isLoading } = useQuery<Checkin[]>({
    queryKey: queryKeys.checkins.week("me"),
    queryFn: () => fetch("/api/checkins").then((r) => r.json()),
  });

  const weekDays = getWeekDays();
  const today = weekDays[weekDays.length - 1];

  const checkinsByDay = weekDays.map((date) => ({
    date,
    count: checkins.filter((c) => c.date === date).length,
    isToday: date === today,
  }));

  const totalThisWeek = checkins.length;
  const daysWithActivity = new Set(checkins.map((c) => c.date)).size;

  const todayCheckins = checkins.filter((c) => c.date === today).length;

  if (isLoading) {
    return <div className="p-8 text-gray-500 text-sm">Cargando...</div>;
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Progreso</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="text-2xl font-bold text-gray-900">{todayCheckins}</p>
          <p className="text-xs text-gray-500 mt-1">Hoy</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="text-2xl font-bold text-gray-900">{totalThisWeek}</p>
          <p className="text-xs text-gray-500 mt-1">Esta semana</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="text-2xl font-bold text-gray-900">{daysWithActivity}</p>
          <p className="text-xs text-gray-500 mt-1">Días activos</p>
        </div>
      </div>

      {/* Actividad por día */}
      <h2 className="text-sm font-medium text-gray-700 mb-4">Últimos 7 días</h2>
      <div className="flex gap-2">
        {checkinsByDay.map(({ date, count, isToday }) => (
          <div key={date} className="flex flex-col items-center gap-2 flex-1">
            <div
              className={`w-full rounded-lg transition-colors ${
                count > 0 ? "bg-black" : "bg-gray-100"
              } ${isToday ? "ring-2 ring-offset-2 ring-black" : ""}`}
              style={{ height: `${Math.max(count * 20, 8)}px` }}
            />
            <span className="text-xs text-gray-400">
              {new Date(date + "T12:00:00").toLocaleDateString("es", {
                weekday: "short",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
