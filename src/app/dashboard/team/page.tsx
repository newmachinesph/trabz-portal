"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, X, Brain, CalendarCheck } from "lucide-react";
import { MOCK_TEAM, type MockTeamMember } from "@/lib/mock-data";

const perfVariant = (p: MockTeamMember["performance"]) => {
  switch (p) {
    case "excellent": return "success" as const;
    case "good": return "default" as const;
    case "average": return "warning" as const;
    case "needs_improvement": return "danger" as const;
  }
};

const perfLabel = (p: MockTeamMember["performance"]) =>
  p === "needs_improvement" ? "Needs Improvement" : p.charAt(0).toUpperCase() + p.slice(1);

export default function TeamPage() {
  const [selected, setSelected] = useState<MockTeamMember | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-500">{MOCK_TEAM.length} active team members</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_TEAM.map((m) => (
          <Card
            key={m.worker.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => setSelected(m)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${m.worker.avatar_color}`}>
                  {m.worker.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{m.worker.name}</p>
                  <p className="text-sm text-gray-500">{m.role}</p>
                  <p className="text-xs text-gray-400">{m.department}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant={perfVariant(m.performance)}>{perfLabel(m.performance)}</Badge>
                <span className="text-xs text-gray-400">Since {new Date(m.hired_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Side Panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-[420px] flex-col border-l border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Member Details</h3>
            <button onClick={() => setSelected(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Worker Info */}
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white ${selected.worker.avatar_color}`}>
                {selected.worker.initials}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{selected.worker.name}</p>
                <p className="text-sm text-gray-500">{selected.role} &middot; {selected.department}</p>
                <p className="text-xs text-gray-400">{selected.worker.location}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-purple-50 p-4 text-center">
                <Brain className="mx-auto h-5 w-5 text-purple-600" />
                <p className="mt-1 text-xl font-bold text-gray-900">{selected.kaya_score}</p>
                <p className="text-xs text-gray-500">KayaScore</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <CalendarCheck className="mx-auto h-5 w-5 text-green-600" />
                <p className="mt-1 text-xl font-bold text-gray-900">{selected.attendance}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>

            {/* Performance */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Performance</h4>
              <Badge variant={perfVariant(selected.performance)}>{perfLabel(selected.performance)}</Badge>
            </div>

            {/* Skills */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selected.worker.skills.map((s) => (
                  <span key={s} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{s}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h4>
              <p className="text-sm text-gray-600">{selected.worker.email}</p>
              <p className="text-sm text-gray-600">{selected.worker.phone}</p>
            </div>

            {/* Notes */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Notes</h4>
              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{selected.notes}</p>
            </div>

            {/* Hired Date */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Hired</h4>
              <p className="text-sm text-gray-600">{new Date(selected.hired_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
