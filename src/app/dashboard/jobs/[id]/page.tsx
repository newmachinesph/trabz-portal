"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { getJob, updateJob, deleteJob, type Job, ApiError } from "@/lib/api";
import { CATEGORIES, JOB_TYPES, STATUSES } from "@/lib/constants";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  const [job, setJob] = useState<Job | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Edit form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getJob(jobId)
      .then((j) => {
        setJob(j);
        setTitle(j.title);
        setDescription(j.description);
        setCategory(j.category);
        setLocation(j.location);
        setSalaryMin(j.salary_min?.toString() || "");
        setSalaryMax(j.salary_max?.toString() || "");
        setJobType(j.job_type);
        setStatus(j.status);
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const updated = await updateJob(jobId, {
        title,
        description,
        category,
        location,
        salary_min: salaryMin ? parseFloat(salaryMin) : undefined,
        salary_max: salaryMax ? parseFloat(salaryMax) : undefined,
        job_type: jobType,
        status,
      });
      setJob(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(jobId);
      router.push("/dashboard/jobs");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!job) {
    return <p className="text-center text-gray-500">Job not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <Link href="/dashboard/jobs" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Back to Jobs
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{editing ? "Edit Job" : job.title}</CardTitle>
            {!editing && (
              <p className="mt-1 text-sm text-gray-500">
                {job.location} &middot; {job.job_type} &middot; {job.category}
              </p>
            )}
          </div>
          {!editing && (
            <div className="flex gap-2">
              <Link href={`/dashboard/jobs/${job.id}/applicants`}>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4" /> Applicants
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          {editing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Min (PHP/day)</label>
                  <Input type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Max (PHP/day)</label>
                  <Input type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant={job.status === "active" ? "success" : job.status === "closed" ? "secondary" : "warning"}>
                  {job.status}
                </Badge>
                <Badge>{job.job_type}</Badge>
              </div>
              {job.salary_min && (
                <p className="text-gray-700">
                  <span className="font-medium">Salary:</span> PHP {job.salary_min.toLocaleString()}
                  {job.salary_max ? ` - ${job.salary_max.toLocaleString()}` : ""}/day
                </p>
              )}
              <p className="text-sm text-gray-500">
                Posted: {new Date(job.posted_at).toLocaleDateString()}
                {job.expires_at && ` · Expires: ${new Date(job.expires_at).toLocaleDateString()}`}
              </p>
              <div className="border-t pt-4">
                <h3 className="mb-2 font-medium text-gray-900">Description</h3>
                <p className="whitespace-pre-wrap text-gray-700">{job.description}</p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="mb-2 font-medium text-gray-900">Requirements</h3>
                  <ul className="list-disc space-y-1 pl-5 text-gray-700">
                    {job.requirements.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="mb-2 font-medium text-gray-900">Benefits</h3>
                  <ul className="list-disc space-y-1 pl-5 text-gray-700">
                    {job.benefits.map((benefit: string, i: number) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="mb-2 font-medium text-gray-900">Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Applications:</span>
                    <span className="ml-2 font-medium text-gray-900">{job.applications_count || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="ml-2 font-medium text-gray-900">{job.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
