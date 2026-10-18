"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getMyCompanies, getCompanyJobs, type Job } from "@/lib/api";

const statusVariant = (s: string) =>
  s === "active" ? "success" : s === "closed" ? "secondary" : "warning";

export default function JobsListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      const companies = await getMyCompanies();
      if (companies.length > 0) setCompanyId(companies[0].id);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    getCompanyJobs(companyId, { page, page_size: 20 })
      .then((res) => {
        setJobs(res.items);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [companyId, page]);

  const filtered = search
    ? jobs.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()))
    : jobs;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
        <Link href="/dashboard/jobs/new">
          <Button>
            <Plus className="h-4 w-4" /> New Job
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search jobs..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            {companyId ? "No jobs found." : "Create a company profile first."}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{job.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{job.location}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{job.job_type}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {job.salary_min ? `PHP ${job.salary_min}${job.salary_max ? `-${job.salary_max}` : ""}` : "—"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <Link href={`/dashboard/jobs/${job.id}`} className="text-blue-600 hover:text-blue-500">
                        View
                      </Link>
                      <span className="mx-2 text-gray-300">|</span>
                      <Link href={`/dashboard/jobs/${job.id}/applicants`} className="text-blue-600 hover:text-blue-500">
                        Applicants
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > 20 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of {total}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={page * 20 >= total} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
