"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Clock, UserCheck, UserX } from "lucide-react";
import { MOCK_ATTENDANCE } from "@/lib/mock-data";

const statusVariant = (s: string) => {
  switch (s) {
    case "present": return "success" as const;
    case "late": return "warning" as const;
    case "absent": return "danger" as const;
    case "leave": return "secondary" as const;
    default: return "secondary" as const;
  }
};

const todayRecords = MOCK_ATTENDANCE.filter((r) => r.date === "2026-02-07");
const present = todayRecords.filter((r) => r.status === "present").length;
const late = todayRecords.filter((r) => r.status === "late").length;
const absent = todayRecords.filter((r) => r.status === "absent").length;
const onLeave = todayRecords.filter((r) => r.status === "leave").length;

export default function AttendancePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-500">Real-time check-ins with geo-verification</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm font-medium text-gray-700">Feb 7, 2026</span>
          <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"><UserCheck className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Present</p><p className="text-xl font-bold text-green-600">{present}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Clock className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Late</p><p className="text-xl font-bold text-amber-600">{late}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"><UserX className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Absent</p><p className="text-xl font-bold text-red-600">{absent}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600"><UserCheck className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">On Leave</p><p className="text-xl font-bold text-gray-600">{onLeave}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader><CardTitle>Today&apos;s Attendance</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Check In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Check Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {todayRecords.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${r.worker.avatar_color}`}>
                          {r.worker.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{r.worker.name}</p>
                          <p className="text-xs text-gray-500">{r.worker.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{r.check_in ?? "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{r.check_out ?? "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{r.hours > 0 ? `${r.hours}h` : "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {r.location_verified ? (
                        <span className="flex items-center gap-1 text-xs text-green-600"><MapPin className="h-3.5 w-3.5" /> Verified</span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
