// dashboard/page.tsx
"use client";

import { useState } from "react";
import ShiftFilter from "../components/ShiftFilter";
import StatCards from "../components/Statcards";

export default function DashboardPage() {
  const [shift, setShift] = useState<number | "all">("all");

  // энд Supabase query орно
  const stats =
    shift === "all"
      ? { totalChildren: 320, approved: 250, pending: 50, paid: 180 }
      : { totalChildren: 28, approved: 22, pending: 4, paid: 18 };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <ShiftFilter active={shift} onChange={setShift} />

      <StatCards stats={stats} />

      {/* Доор нь */}
      {/* CampTable */}
      {/* Charts */}
    </div>
  );
}
