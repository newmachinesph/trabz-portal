"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Users, AlertTriangle } from "lucide-react";
import { MOCK_SHIFTS, type ShiftType } from "@/lib/mock-data";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const shiftLabel = (s: ShiftType) => {
  if (!s) return null;
  switch (s) {
    case "morning": return { text: "AM", color: "bg-amber-100 text-amber-800" };
    case "afternoon": return { text: "PM", color: "bg-blue-100 text-blue-800" };
    case "night": return { text: "Night", color: "bg-purple-100 text-purple-800" };
  }
};

const totalHours = MOCK_SHIFTS.reduce(
  (sum, row) => sum + row.shifts.filter((s) => s !== null).length * 8,
  0,
);
const workersScheduled = MOCK_SHIFTS.length;
const overtimeWorkers = MOCK_SHIFTS.filter(
  (row) => row.shifts.filter((s) => s !== null).length > 5,
).length;

export default function ShiftsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shift Management</h1>
          <p className="text-gray-500">Weekly schedule and attendance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700">Feb 3 – 9, 2026</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-xl font-bold text-gray-900">{totalHours}h</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Workers Scheduled</p>
              <p className="text-xl font-bold text-gray-900">{workersScheduled}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overtime Alerts</p>
              <p className="text-xl font-bold text-gray-900">{overtimeWorkers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="w-48 pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  {DAYS.map((d) => (
                    <th key={d} className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">{d}</th>
                  ))}
                  <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_SHIFTS.map((row) => {
                  const hrs = row.shifts.filter((s) => s !== null).length * 8;
                  return (
                    <tr key={row.worker.id}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${row.worker.avatar_color}`}>
                            {row.worker.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.worker.name}</span>
                        </div>
                      </td>
                      {row.shifts.map((s, i) => {
                        const info = shiftLabel(s);
                        return (
                          <td key={i} className="py-3 text-center">
                            {info ? (
                              <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${info.color}`}>
                                {info.text}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-300">—</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="py-3 text-center">
                        <Badge variant={hrs > 40 ? "warning" : "secondary"}>{hrs}h</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>Legend:</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-amber-100" /> Morning (AM)</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-blue-100" /> Afternoon (PM)</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-purple-100" /> Night</span>
      </div>
    </div>
  );
}
