"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminListCompanies, adminVerifyCompany, type Company } from "@/lib/api";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminListCompanies({ page, page_size: 20 })
      .then((res) => {
        setCompanies(res.items);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  async function toggleVerify(companyId: number, current: boolean) {
    await adminVerifyCompany(companyId, !current);
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, verified: !current } : c)),
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Company Verification</h1>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Created</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{c.industry || "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{c.location || "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {c.verified ? (
                        <Badge variant="success">
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Unverified</Badge>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Button
                        variant={c.verified ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleVerify(c.id, c.verified)}
                      >
                        {c.verified ? (
                          <><XCircle className="h-4 w-4" /> Revoke</>
                        ) : (
                          <><CheckCircle2 className="h-4 w-4" /> Verify</>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {total > 20 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of {total}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page * 20 >= total} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
