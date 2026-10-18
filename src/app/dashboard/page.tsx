"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Users, UserCheck, Clock, Plus, Sparkles, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  getMyCompanies,
  getCompanyStats,
  getCompanyJobs,
  getMatchedWorkers,
  type Company,
  type CompanyStats,
  type Job,
  type JobMatch,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const companies = await getMyCompanies();
        if (companies.length > 0) {
          const c = companies[0];
          setCompany(c);
          const results = await Promise.allSettled([
            getCompanyStats(c.id),
            getCompanyJobs(c.id, { page_size: 5 }),
            getMatchedWorkers(),
          ]);
          if (results[0].status === "fulfilled") setStats(results[0].value);
          if (results[1].status === "fulfilled") setRecentJobs(results[1].value.items);
          if (results[2].status === "fulfilled") setMatches(results[2].value);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Welcome, {user?.name}!</h2>
        <p className="text-gray-500">Set up your company profile to start posting jobs.</p>
        <Link href="/dashboard/company">
          <Button>
            <Plus className="h-4 w-4" /> Create Company Profile
          </Button>
        </Link>
      </div>
    );
  }

  const statCards = [
    { label: "Active Jobs", value: stats?.active_jobs ?? 0, icon: Briefcase, color: "text-blue-600 bg-blue-50" },
    { label: "Total Applicants", value: stats?.total_applicants ?? 0, icon: Users, color: "text-purple-600 bg-purple-50" },
    { label: "Hired", value: stats?.hired ?? 0, icon: UserCheck, color: "text-green-600 bg-green-50" },
    { label: "Pending Review", value: stats?.pending_review ?? 0, icon: Clock, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">{company.name}</p>
        </div>
        <Link href="/dashboard/jobs/new">
          <Button>
            <Plus className="h-4 w-4" /> Post a Job
          </Button>
        </Link>
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

      {/* Smart Matched Workers */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Smart Matched Workers
          </h2>
          <Link href="/dashboard/team" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, 3).map((m) => (
            <Card key={m.job.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{m.job.title}</p>
                    <p className="text-sm text-gray-500">{m.job.location}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.job.category}</p>
                  </div>
                  <Badge variant={m.score >= 90 ? "success" : "default"}>
                    {m.score}% match
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Object.keys(m.breakdown).map((key) => (
                    <span key={key} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{key}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
          <Link href="/dashboard/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        {recentJobs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No jobs posted yet. Create your first job posting!
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {recentJobs.map((job) => (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
                <Card className="transition-colors hover:bg-gray-50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500">
                        {job.location} &middot; {job.job_type} &middot; {job.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        job.status === "active" ? "bg-green-100 text-green-800" :
                        job.status === "closed" ? "bg-gray-100 text-gray-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {job.status}
                      </span>
                      {job.salary_min && (
                        <p className="mt-1 text-sm text-gray-500">
                          PHP {job.salary_min.toLocaleString()}{job.salary_max ? ` - ${job.salary_max.toLocaleString()}` : ""}/day
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
