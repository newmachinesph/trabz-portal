"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getJob,
  listJobApplications,
  updateApplicationStatus,
  getUser,
  type Job,
  type Application,
  type User,
} from "@/lib/api";

const COLUMNS = [
  { key: "applied", label: "Applied", color: "bg-blue-500" },
  { key: "screened", label: "Screened", color: "bg-yellow-500" },
  { key: "interviewed", label: "Interviewed", color: "bg-purple-500" },
  { key: "offered", label: "Offered", color: "bg-indigo-500" },
  { key: "hired", label: "Hired", color: "bg-green-500" },
  { key: "rejected", label: "Rejected", color: "bg-red-500" },
];

interface AppWithWorker extends Application {
  worker?: User;
}

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<AppWithWorker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AppWithWorker | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [j, res] = await Promise.all([
        getJob(jobId),
        listJobApplications(jobId, { page_size: 100 }),
      ]);
      setJob(j);

      // Fetch worker details for each application
      const appsWithWorkers = await Promise.all(
        res.items.map(async (app) => {
          try {
            const worker = await getUser(app.worker_id);
            return { ...app, worker };
          } catch {
            return app;
          }
        }),
      );
      setApplications(appsWithWorkers);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function moveToStatus(appId: number, newStatus: string) {
    try {
      const updated = await updateApplicationStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, ...updated } : a)),
      );
      if (selectedApp?.id === appId) {
        setSelectedApp((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Failed to move applicant to status:", newStatus, err);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/dashboard/jobs/${jobId}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" /> Back to Job
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Applicants: {job?.title}
          </h1>
          <p className="text-sm text-gray-500">{applications.length} applicant{applications.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colApps = applications.filter((a) => a.status === col.key);
          return (
            <div key={col.key} className="min-w-[260px] flex-shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-semibold text-gray-700">{col.label}</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{colApps.length}</span>
              </div>
              <div className="space-y-2">
                {colApps.map((app) => (
                  <Card
                    key={app.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                    onClick={() => setSelectedApp(app)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <UserIcon className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {app.worker?.name || `Worker #${app.worker_id}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(app.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {colApps.length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-200 p-4 text-center text-xs text-gray-400">
                    No applicants
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail side panel */}
      {selectedApp && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-96 flex-col border-l border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold">Applicant Details</h3>
            <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedApp.worker?.name || `Worker #${selectedApp.worker_id}`}</p>
                <p className="text-sm text-gray-500">{selectedApp.worker?.location || "—"}</p>
              </div>
            </div>

            {selectedApp.worker?.bio && (
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">Bio</p>
                <p className="text-sm text-gray-700">{selectedApp.worker.bio}</p>
              </div>
            )}

            {selectedApp.worker?.skills && selectedApp.worker.skills.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">Skills</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedApp.worker.skills.map((s) => (
                    <span key={s} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedApp.notes && (
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">Notes</p>
                <p className="text-sm text-gray-700">{selectedApp.notes}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">Applied</p>
              <p className="text-sm text-gray-700">{new Date(selectedApp.applied_at).toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className="border-t pt-4">
              <p className="mb-2 text-xs font-medium uppercase text-gray-400">Move to</p>
              <div className="flex flex-wrap gap-2">
                {COLUMNS.filter((c) => c.key !== selectedApp.status).map((col) => (
                  <Button
                    key={col.key}
                    variant="outline"
                    size="sm"
                    onClick={() => moveToStatus(selectedApp.id, col.key)}
                  >
                    {col.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
