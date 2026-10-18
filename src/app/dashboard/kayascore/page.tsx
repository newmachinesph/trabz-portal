"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Users, AlertTriangle, Star, X } from "lucide-react";
import { MOCK_KAYA_ASSESSMENTS, type KayaAssessment } from "@/lib/mock-data";

const riskVariant = (r: string) =>
  r === "low" ? "success" as const : r === "medium" ? "warning" as const : "danger" as const;

const scoreColor = (s: number) =>
  s >= 80 ? "bg-green-500" : s >= 60 ? "bg-yellow-500" : "bg-red-500";

const avgScore = Math.round(
  MOCK_KAYA_ASSESSMENTS.reduce((sum, a) => sum + a.overall_score, 0) / MOCK_KAYA_ASSESSMENTS.length,
);
const highRisk = MOCK_KAYA_ASSESSMENTS.filter((a) => a.risk_level === "high").length;
const topPerformer = MOCK_KAYA_ASSESSMENTS.reduce((best, a) => (a.overall_score > best.overall_score ? a : best));

const statCards = [
  { label: "Total Assessed", value: MOCK_KAYA_ASSESSMENTS.length, icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Average Score", value: avgScore, icon: Brain, color: "text-purple-600 bg-purple-50" },
  { label: "High Risk", value: highRisk, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
  { label: "Top Performer", value: topPerformer.worker_name.split(" ")[0], icon: Star, color: "text-amber-600 bg-amber-50" },
];

export default function KayaScorePage() {
  const [selected, setSelected] = useState<KayaAssessment | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KayaScore Assessments</h1>
        <p className="text-gray-500">Behavioral assessment results for applicants and workers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Top Traits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_KAYA_ASSESSMENTS.map((a) => (
                  <tr
                    key={a.worker_id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelected(a)}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${a.avatar_color}`}>
                          {a.initials}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{a.worker_name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div className={`h-full rounded-full ${scoreColor(a.overall_score)}`} style={{ width: `${a.overall_score}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{a.overall_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {a.top_traits.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={riskVariant(a.risk_level)}>{a.risk_level}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(a.assessed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Side Panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-[420px] flex-col border-l border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold text-gray-900">KayaScore Details</h3>
            <button onClick={() => setSelected(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Worker Info */}
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${selected.avatar_color}`}>
                {selected.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selected.worker_name}</p>
                <p className="text-sm text-gray-500">Overall Score: <span className="font-bold">{selected.overall_score}/100</span></p>
              </div>
            </div>

            {/* Domain Scores (CSS radar-like bars) */}
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Domain Scores</h4>
              <div className="space-y-3">
                {selected.domains.map((d) => (
                  <div key={d.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-gray-700">{d.name}</span>
                      <span className="font-semibold text-gray-900">{d.score}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${scoreColor(d.score)}`} style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Traits */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Top Traits</h4>
              <div className="flex flex-wrap gap-2">
                {selected.top_traits.map((t) => (
                  <Badge key={t} variant="success">{t}</Badge>
                ))}
              </div>
            </div>

            {/* Dark Traits */}
            {selected.dark_traits.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Dark Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.dark_traits.map((t) => (
                    <Badge key={t} variant="danger">{t}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Level */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Risk Level</h4>
              <Badge variant={riskVariant(selected.risk_level)}>{selected.risk_level} risk</Badge>
            </div>

            {/* Conflict Notes */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Conflict Notes</h4>
              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{selected.conflict_notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
