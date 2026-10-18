"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  CalendarDays,
  Banknote,
  Brain,
  ShieldCheck,
  Download,
  Check,
} from "lucide-react";

const reports = [
  {
    id: "hiring",
    title: "Hiring Summary",
    description: "Overview of all hires, offers, and rejections for the selected period.",
    icon: Briefcase,
    color: "text-blue-600 bg-blue-50",
    lastGenerated: "2026-02-01",
  },
  {
    id: "pipeline",
    title: "Applicant Pipeline",
    description: "Funnel breakdown from application to hire with conversion rates.",
    icon: Users,
    color: "text-purple-600 bg-purple-50",
    lastGenerated: "2026-01-28",
  },
  {
    id: "attendance",
    title: "Shift Attendance",
    description: "Attendance records, no-shows, and overtime hours by worker.",
    icon: CalendarDays,
    color: "text-amber-600 bg-amber-50",
    lastGenerated: "2026-01-25",
  },
  {
    id: "payroll",
    title: "Payroll Summary",
    description: "Total wages, deductions, and net pay breakdown per worker.",
    icon: Banknote,
    color: "text-green-600 bg-green-50",
    lastGenerated: "2026-01-20",
  },
  {
    id: "kayascore",
    title: "KayaScore Summary",
    description: "Behavioral assessment scores, risk flags, and trait distribution.",
    icon: Brain,
    color: "text-pink-600 bg-pink-50",
    lastGenerated: "2026-01-15",
  },
  {
    id: "compliance",
    title: "DOLE Compliance",
    description: "Compliance checklist status, pending requirements, and deadlines.",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50",
    lastGenerated: null,
  },
];

export default function ReportsPage() {
  const [generated, setGenerated] = useState<Set<string>>(new Set());

  function handleGenerate(id: string) {
    setGenerated((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setGenerated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500">Generate and download reports for your business</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${r.color}`}>
                  <r.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{r.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  {r.lastGenerated
                    ? `Last: ${new Date(r.lastGenerated).toLocaleDateString()}`
                    : "Never generated"}
                </p>
                {generated.has(r.id) ? (
                  <Button variant="outline" size="sm" disabled>
                    <Check className="h-4 w-4 text-green-600" /> Generated
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleGenerate(r.id)}>
                    <Download className="h-4 w-4" /> Generate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
