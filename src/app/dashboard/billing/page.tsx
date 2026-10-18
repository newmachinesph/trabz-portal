"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_INVOICES } from "@/lib/mock-data";

const plans = [
  {
    name: "Starter",
    price: 999,
    features: ["Up to 5 job postings", "Basic applicant tracking", "Email support", "50 KayaScore assessments/mo"],
    current: false,
  },
  {
    name: "Professional",
    price: 2999,
    features: ["Unlimited job postings", "Advanced applicant tracking", "Priority support", "Unlimited KayaScore", "Shift management", "Analytics dashboard"],
    current: true,
  },
  {
    name: "Enterprise",
    price: 7999,
    features: ["Everything in Professional", "Dedicated account manager", "Custom integrations", "API access", "DOLE compliance tools", "Multi-branch support"],
    current: false,
  },
];

const invoiceStatus = (s: string) =>
  s === "paid" ? "success" as const : s === "pending" ? "warning" as const : "danger" as const;

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-500">Manage your plan and payment history</p>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="text-xl font-bold text-gray-900">Professional Plan</p>
            <p className="text-sm text-gray-600">₱2,999/month &middot; Next billing: Feb 15, 2026</p>
          </div>
          <Badge variant="success">Active</Badge>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Available Plans</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col", plan.current && "border-blue-500 ring-2 ring-blue-500/20")}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-gray-900">₱{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <ul className="flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant={plan.price > 2999 ? "default" : "outline"} className="w-full">
                    {plan.price > 2999 ? "Upgrade" : "Downgrade"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{new Date(inv.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inv.description}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">₱{inv.amount.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={invoiceStatus(inv.status)}>{inv.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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
