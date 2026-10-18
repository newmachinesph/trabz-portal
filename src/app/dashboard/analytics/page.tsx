"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Briefcase, ThumbsUp, UserCheck } from "lucide-react";
import { MOCK_ANALYTICS } from "@/lib/mock-data";

const { stats, funnel, monthly_apps, top_categories, recent_hires } = MOCK_ANALYTICS;
const maxFunnel = funnel[0].count;
const maxMonthly = Math.max(...monthly_apps.map((m) => m.count));

const statCards = [
  { label: "Avg Time-to-Hire", value: `${stats.time_to_hire} days`, icon: Clock, color: "text-blue-600 bg-blue-50" },
  { label: "Cost-per-Hire", value: `₱${stats.cost_per_hire.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  { label: "Open Positions", value: String(stats.open_positions), icon: Briefcase, color: "text-purple-600 bg-purple-50" },
  { label: "Offer Acceptance", value: `${stats.offer_acceptance}%`, icon: ThumbsUp, color: "text-amber-600 bg-amber-50" },
];

const funnelColors = ["bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-emerald-500", "bg-green-600"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hiring Analytics</h1>
        <p className="text-gray-500">Overview of your recruitment performance</p>
      </div>

      {/* Stat Cards */}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hiring Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnel.map((stage, i) => (
              <div key={stage.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-gray-500">{stage.count}</span>
                </div>
                <div className="h-8 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div
                    className={`flex h-full items-center rounded-lg ${funnelColors[i]} transition-all`}
                    style={{ width: `${(stage.count / maxFunnel) * 100}%` }}
                  >
                    <span className="pl-3 text-xs font-medium text-white">
                      {Math.round((stage.count / maxFunnel) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-52 items-end gap-3">
              {monthly_apps.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-medium text-gray-600">{m.count}</span>
                  <div
                    className="w-full rounded-t-lg bg-blue-500 transition-all"
                    style={{ height: `${(m.count / maxMonthly) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs font-medium uppercase text-gray-500">
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-right">Applications</th>
                  <th className="pb-3 text-right">Hire Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {top_categories.map((c) => (
                  <tr key={c.category}>
                    <td className="py-3 text-sm font-medium text-gray-900">{c.category}</td>
                    <td className="py-3 text-right text-sm text-gray-600">{c.applications}</td>
                    <td className="py-3 text-right">
                      <Badge variant={c.hire_rate >= 20 ? "success" : "secondary"}>{c.hire_rate}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Hires */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Hires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent_hires.map((h) => (
              <div key={h.name} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{h.name}</p>
                  <p className="text-xs text-gray-500">{h.position}</p>
                </div>
                <p className="text-xs text-gray-400">{new Date(h.date).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
