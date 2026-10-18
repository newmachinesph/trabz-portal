"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Eye, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_DOCUMENTS, type MockDocument } from "@/lib/mock-data";

type DocFilter = "all" | "resume" | "id" | "certificate" | "contract";

const FILTERS: { key: DocFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "resume", label: "Resumes" },
  { key: "id", label: "IDs" },
  { key: "certificate", label: "Certificates" },
  { key: "contract", label: "Contracts" },
];

const typeVariant = (t: MockDocument["type"]) => {
  switch (t) {
    case "resume": return "default" as const;
    case "id": return "warning" as const;
    case "certificate": return "success" as const;
    case "contract": return "secondary" as const;
  }
};

const statusVariant = (s: MockDocument["status"]) =>
  s === "verified" ? "success" as const : s === "pending" ? "warning" as const : "danger" as const;

export default function DocumentsPage() {
  const [filter, setFilter] = useState<DocFilter>("all");
  const [docs, setDocs] = useState(MOCK_DOCUMENTS);

  const filtered = filter === "all" ? docs : docs.filter((d) => d.type === filter);

  function updateStatus(id: number, status: MockDocument["status"]) {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500">Manage worker documents and verification</p>
        </div>
        <Button>
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Worker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{doc.file_name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{doc.worker_name}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={typeVariant(doc.type)}>{doc.type}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={statusVariant(doc.status)}>{doc.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {doc.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" title="Verify" onClick={() => updateStatus(doc.id, "verified")}>
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Reject" onClick={() => updateStatus(doc.id, "rejected")}>
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                      </div>
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
