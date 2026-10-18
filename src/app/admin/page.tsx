"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Briefcase, FileText, Building2, UserCheck, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminStats, type PlatformStats } from "@/lib/api";

export default function AdminPage() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats?.total_users ?? 0, icon: Users, color: "text-blue-600 bg-blue-50", href: "/admin/users" },
    { label: "Total Jobs", value: stats?.total_jobs ?? 0, icon: Briefcase, color: "text-purple-600 bg-purple-50", href: "/admin/jobs" },
    { label: "Applications", value: stats?.total_applications ?? 0, icon: FileText, color: "text-amber-600 bg-amber-50", href: null },
    { label: "Companies", value: stats?.total_companies ?? 0, icon: Building2, color: "text-indigo-600 bg-indigo-50", href: "/admin/companies" },
    { label: "Total Hires", value: stats?.total_hires ?? 0, icon: UserCheck, color: "text-green-600 bg-green-50", href: null },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => {
          const inner = (
            <Card className={c.href ? "transition-shadow hover:shadow-md" : ""}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color}`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{c.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{c.value}</p>
                </div>
              </CardContent>
            </Card>
          );
          return c.href ? (
            <Link key={c.label} href={c.href}>{inner}</Link>
          ) : (
            <div key={c.label}>{inner}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/admin/users">
          <Card className="p-6 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-gray-900">Manage Users</h3>
            <p className="mt-1 text-sm text-gray-500">Search users, change roles, moderate accounts</p>
          </Card>
        </Link>
        <Link href="/admin/jobs">
          <Card className="p-6 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-gray-900">Moderate Jobs</h3>
            <p className="mt-1 text-sm text-gray-500">Review, approve, or close job postings</p>
          </Card>
        </Link>
        <Link href="/admin/companies">
          <Card className="p-6 transition-shadow hover:shadow-md">
            <h3 className="font-semibold text-gray-900">Verify Companies</h3>
            <p className="mt-1 text-sm text-gray-500">Review and verify company profiles</p>
          </Card>
        </Link>
        <Link href="/admin/contacts">
          <Card className="p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Contact Messages</h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">View and respond to contact form submissions</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
