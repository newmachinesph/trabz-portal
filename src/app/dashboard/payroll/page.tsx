"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, TrendingUp, Users, Wallet } from "lucide-react";
import { MOCK_PAYROLL } from "@/lib/mock-data";

const statusVariant = (s: string) =>
  s === "paid" ? "success" as const : s === "processing" ? "warning" as const : "secondary" as const;

const totalGross = MOCK_PAYROLL.reduce((sum, p) => sum + p.gross_pay, 0);
const totalNet = MOCK_PAYROLL.reduce((sum, p) => sum + p.net_pay, 0);
const totalDeductions = totalGross - totalNet;

export default function PayrollPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
        <p className="text-gray-500">Jan 16–31, 2026 payroll period</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Banknote className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Gross Pay</p><p className="text-xl font-bold text-gray-900">₱{totalGross.toLocaleString()}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"><TrendingUp className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Deductions</p><p className="text-xl font-bold text-gray-900">₱{totalDeductions.toLocaleString()}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"><Wallet className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Net Pay</p><p className="text-xl font-bold text-green-600">₱{totalNet.toLocaleString()}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><Users className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Workers</p><p className="text-xl font-bold text-gray-900">{MOCK_PAYROLL.length}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader><CardTitle>Payroll Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Days</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Rate/Day</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Gross</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">SSS</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">PhilHealth</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Pag-IBIG</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Net Pay</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_PAYROLL.map((p) => (
                  <tr key={p.worker.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${p.worker.avatar_color}`}>
                          {p.worker.initials}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{p.worker.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-gray-600">{p.days_worked}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-gray-600">₱{p.daily_rate}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-medium text-gray-900">₱{p.gross_pay.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-red-500">-₱{p.sss}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-red-500">-₱{p.philhealth}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-red-500">-₱{p.pagibig}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-green-600">₱{p.net_pay.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
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
