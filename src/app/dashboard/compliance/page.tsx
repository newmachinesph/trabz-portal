"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { MOCK_COMPLIANCE } from "@/lib/mock-data";

const statusVariant = (s: string) =>
  s === "compliant" ? "success" as const : s === "overdue" ? "danger" as const : "warning" as const;

const statusLabel = (s: string) =>
  s === "compliant" ? "Compliant" : s === "overdue" ? "Overdue" : "Action Needed";

const categoryColor = (c: string) => {
  switch (c) {
    case "labor": return "bg-blue-50 text-blue-700";
    case "benefits": return "bg-green-50 text-green-700";
    case "safety": return "bg-amber-50 text-amber-700";
    case "records": return "bg-purple-50 text-purple-700";
    default: return "bg-gray-50 text-gray-700";
  }
};

const compliant = MOCK_COMPLIANCE.filter((c) => c.status === "compliant").length;
const actionNeeded = MOCK_COMPLIANCE.filter((c) => c.status === "action_needed").length;
const overdue = MOCK_COMPLIANCE.filter((c) => c.status === "overdue").length;

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">DOLE Compliance</h1>
        <p className="text-gray-500">Philippine labor law and regulatory compliance tracker</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-xl font-bold text-gray-900">{MOCK_COMPLIANCE.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Compliant</p>
              <p className="text-xl font-bold text-green-600">{compliant}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Action Needed</p>
              <p className="text-xl font-bold text-amber-600">{actionNeeded}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-xl font-bold text-red-600">{overdue}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Score Bar */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Overall Compliance Score</p>
            <p className="text-sm font-bold text-gray-900">{Math.round((compliant / MOCK_COMPLIANCE.length) * 100)}%</p>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${(compliant / MOCK_COMPLIANCE.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Table */}
      <Card>
        <CardHeader><CardTitle>Compliance Checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Requirement</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Deadline</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_COMPLIANCE.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900 max-w-xs">{item.requirement}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${categoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Badge variant={statusVariant(item.status)}>{statusLabel(item.status)}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {item.deadline ? new Date(item.deadline).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 max-w-sm">{item.notes}</td>
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
