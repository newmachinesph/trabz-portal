"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  adminListContacts,
  adminMarkContactRead,
  type ContactSubmission,
} from "@/lib/api";

const subjectLabel: Record<string, string> = {
  general: "General",
  employer: "Employer",
  worker: "Worker",
  ofw: "OFW",
  media: "Media",
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    adminListContacts({ page, page_size: 20 })
      .then((res) => {
        setContacts(res.items);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  async function toggleRead(id: number, currentRead: boolean) {
    await adminMarkContactRead(id, !currentRead);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: !currentRead } : c)),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-sm text-gray-500">{total} total</p>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">No contact submissions yet.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                className={`rounded-xl border bg-white transition-colors ${
                  c.read ? "border-gray-200" : "border-blue-200 bg-blue-50/30"
                }`}
              >
                <button
                  className="flex w-full items-center gap-4 px-6 py-4 text-left"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="flex-shrink-0">
                    {c.read ? (
                      <MailOpen className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {c.first_name} {c.last_name}
                      </span>
                      <Badge variant={c.read ? "secondary" : "default"}>
                        {subjectLabel[c.subject] || c.subject}
                      </Badge>
                      {!c.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="truncate text-sm text-gray-500">{c.email}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                  {expanded === c.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expanded === c.id && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                      <div>
                        <dt className="font-medium text-gray-500">Email</dt>
                        <dd className="text-gray-900">{c.email}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-500">Phone</dt>
                        <dd className="text-gray-900">{c.phone || "—"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-500">Subject</dt>
                        <dd className="text-gray-900">
                          {subjectLabel[c.subject] || c.subject}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-500">Date</dt>
                        <dd className="text-gray-900">
                          {new Date(c.created_at).toLocaleString()}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">
                        Message
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
                        {c.message}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRead(c.id, c.read)}
                      >
                        {c.read ? "Mark as unread" : "Mark as read"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`mailto:${c.email}`, "_blank")
                        }
                      >
                        Reply via email
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {total > 20 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of{" "}
                {total}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page * 20 >= total}
                  onClick={() => setPage(page + 1)}
                >
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
