"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCog, Search, Eye, Building2, LogIn, AlertTriangle } from "lucide-react";
import { MOCK_EMPLOYERS, type MockEmployer } from "@/lib/mock-data";

const statusVariant = (s: MockEmployer["status"]) =>
  s === "active" ? "success" as const : s === "trial" ? "warning" as const : "danger" as const;

const planColor = (p: string) => {
  switch (p) {
    case "Starter": return "bg-gray-100 text-gray-700";
    case "Professional": return "bg-blue-100 text-blue-700";
    case "Enterprise": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function ImpersonatePage() {
  const [search, setSearch] = useState("");
  const [impersonating, setImpersonating] = useState<MockEmployer | null>(null);

  const filtered = MOCK_EMPLOYERS.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Impersonate Employer</h1>
        <p className="text-gray-500">View the portal as a specific employer for support and troubleshooting</p>
      </div>

      {/* Warning Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
        <div>
          <p className="text-sm font-medium text-amber-800">Admin Impersonation Mode</p>
          <p className="mt-1 text-sm text-amber-700">
            Actions taken while impersonating are logged for audit purposes. Use this feature only for support and troubleshooting.
          </p>
        </div>
      </div>

      {/* Active Impersonation Banner */}
      {impersonating && (
        <Card className="border-blue-300 bg-blue-50">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {impersonating.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-blue-900">Currently viewing as: {impersonating.name}</p>
                <p className="text-sm text-blue-700">{impersonating.company} &middot; {impersonating.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                <Eye className="h-4 w-4" /> View Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setImpersonating(null)} className="text-blue-700 hover:bg-blue-100">
                Exit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name, company, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Employers</CardTitle>
          <CardDescription>{MOCK_EMPLOYERS.length} employers on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Employer</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Plan</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                          {emp.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{emp.company}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${planColor(emp.plan)}`}>
                        {emp.plan}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Badge variant={statusVariant(emp.status)}>{emp.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setImpersonating(emp)}
                        disabled={impersonating?.id === emp.id}
                      >
                        <UserCog className="h-4 w-4" />
                        {impersonating?.id === emp.id ? "Active" : "Impersonate"}
                      </Button>
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
