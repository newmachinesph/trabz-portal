"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, MessageSquare, Bell, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_NOTIFICATIONS, type MockNotification } from "@/lib/mock-data";

const FILTERS = ["all", "application", "message", "status", "system"] as const;
type Filter = (typeof FILTERS)[number];

const filterLabels: Record<Filter, string> = {
  all: "All",
  application: "Applications",
  message: "Messages",
  status: "Status Changes",
  system: "System",
};

const typeIcon = (t: MockNotification["type"]) => {
  switch (t) {
    case "application": return UserPlus;
    case "message": return MessageSquare;
    case "status": return ArrowRightLeft;
    case "system": return Bell;
  }
};

const typeColor = (t: MockNotification["type"]) => {
  switch (t) {
    case "application": return "bg-blue-50 text-blue-600";
    case "message": return "bg-purple-50 text-purple-600";
    case "status": return "bg-amber-50 text-amber-600";
    case "system": return "bg-gray-100 text-gray-600";
  }
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              No notifications in this category
            </CardContent>
          </Card>
        ) : (
          filtered.map((n) => {
            const Icon = typeIcon(n.type);
            return (
              <Card key={n.id} className={cn(!n.read && "border-blue-200 bg-blue-50/30")}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${typeColor(n.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-sm text-gray-600">{n.description}</p>
                    <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
