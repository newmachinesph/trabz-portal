"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import { MOCK_REVIEWS, type MockReview } from "@/lib/mock-data";

const perfVariant = (score: number) =>
  score >= 90 ? "success" as const : score >= 75 ? "default" as const : score >= 60 ? "warning" as const : "danger" as const;

const perfLabel = (score: number) =>
  score >= 90 ? "Excellent" : score >= 75 ? "Good" : score >= 60 ? "Average" : "Needs Improvement";

const scoreColor = (s: number) =>
  s >= 90 ? "bg-green-500" : s >= 75 ? "bg-blue-500" : s >= 60 ? "bg-yellow-500" : "bg-red-500";

const categories = ["quality", "productivity", "reliability", "teamwork"] as const;

export default function PerformancePage() {
  const [selected, setSelected] = useState<MockReview | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-500">Structured feedback and reliability scoring</p>
        </div>
        <Button><Star className="h-4 w-4" /> New Review</Button>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader><CardTitle>Q4 2025 Reviews</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Productivity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Reliability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Teamwork</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Overall</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_REVIEWS.map((r) => (
                  <tr key={r.worker.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelected(r)}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${r.worker.avatar_color}`}>
                          {r.worker.initials}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{r.worker.name}</span>
                      </div>
                    </td>
                    {categories.map((cat) => (
                      <td key={cat} className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                            <div className={`h-full rounded-full ${scoreColor(r[cat])}`} style={{ width: `${r[cat]}%` }} />
                          </div>
                          <span className="text-xs text-gray-600">{r[cat]}</span>
                        </div>
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">{r.overall}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={perfVariant(r.overall)}>{perfLabel(r.overall)}</Badge>
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
            <h3 className="text-lg font-semibold text-gray-900">Review Details</h3>
            <button onClick={() => setSelected(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${selected.worker.avatar_color}`}>
                {selected.worker.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selected.worker.name}</p>
                <p className="text-sm text-gray-500">{selected.period} &middot; Reviewed by {selected.reviewer}</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-3xl font-bold text-gray-900">{selected.overall}</p>
              <Badge variant={perfVariant(selected.overall)}>{perfLabel(selected.overall)}</Badge>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="capitalize text-gray-700">{cat}</span>
                    <span className="font-semibold text-gray-900">{selected[cat]}</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${scoreColor(selected[cat])}`} style={{ width: `${selected[cat]}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">Comments</h4>
              <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{selected.comments}</p>
            </div>

            <div>
              <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-400">Review Date</h4>
              <p className="text-sm text-gray-600">{new Date(selected.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
