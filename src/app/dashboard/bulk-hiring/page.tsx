"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Upload, FileText, CheckCircle2, Clock, Zap } from "lucide-react";

interface BulkJob {
  id: number;
  title: string;
  location: string;
  slots: number;
  filled: number;
  status: "active" | "filled" | "draft";
  created: string;
}

const MOCK_BULK_JOBS: BulkJob[] = [
  { id: 1, title: "Warehouse Packers — Christmas Rush", location: "Paranaque Warehouse", slots: 50, filled: 38, status: "active", created: "2026-01-10" },
  { id: 2, title: "Construction Laborers — BGC Tower 5", location: "Taguig, BGC", slots: 30, filled: 30, status: "filled", created: "2025-12-15" },
  { id: 3, title: "Event Crew — Sinulog 2026", location: "Cebu City", slots: 20, filled: 12, status: "active", created: "2026-01-20" },
  { id: 4, title: "Factory Line Workers — Q1 Batch", location: "Calamba, Laguna", slots: 40, filled: 0, status: "draft", created: "2026-02-01" },
  { id: 5, title: "Delivery Riders — Metro Manila Expansion", location: "NCR Wide", slots: 100, filled: 67, status: "active", created: "2026-01-05" },
];

const statusVariant = (s: string) =>
  s === "active" ? "success" as const : s === "filled" ? "default" as const : "secondary" as const;

export default function BulkHiringPage() {
  const [showForm, setShowForm] = useState(false);

  const totalSlots = MOCK_BULK_JOBS.reduce((sum, j) => sum + j.slots, 0);
  const totalFilled = MOCK_BULK_JOBS.reduce((sum, j) => sum + j.filled, 0);
  const activeJobs = MOCK_BULK_JOBS.filter((j) => j.status === "active").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Hiring</h1>
          <p className="text-gray-500">Post multiple positions and hire at scale</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Zap className="h-4 w-4" /> New Bulk Post
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Users className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Total Slots</p><p className="text-xl font-bold text-gray-900">{totalSlots}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"><CheckCircle2 className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Filled</p><p className="text-xl font-bold text-green-600">{totalFilled}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Clock className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Fill Rate</p><p className="text-xl font-bold text-gray-900">{Math.round((totalFilled / totalSlots) * 100)}%</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><FileText className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Active Posts</p><p className="text-xl font-bold text-gray-900">{activeJobs}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* New Bulk Post Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Bulk Job Post</CardTitle>
            <CardDescription>Fill in details or upload a CSV file with multiple positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <Input placeholder="e.g. Warehouse Packers — Christmas Rush" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Input placeholder="e.g. Paranaque Warehouse" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Number of Slots</label>
                <Input type="number" placeholder="50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Daily Rate (₱)</label>
                <Input type="number" placeholder="645" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea placeholder="Job description, requirements, schedule..." rows={3} />
            </div>
            <div className="flex items-center gap-4">
              <Button>Post Now</Button>
              <Button variant="outline"><Upload className="h-4 w-4" /> Upload CSV</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Jobs Table */}
      <Card>
        <CardHeader><CardTitle>Bulk Job Posts</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Position</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Slots</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Progress</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Posted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {MOCK_BULK_JOBS.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">{job.location}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-gray-900">{job.filled}/{job.slots}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full ${job.filled === job.slots ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${(job.filled / job.slots) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{Math.round((job.filled / job.slots) * 100)}%</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">{new Date(job.created).toLocaleDateString()}</td>
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
