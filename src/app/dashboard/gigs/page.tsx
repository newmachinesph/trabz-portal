"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Zap, Clock, CheckCircle2, MapPin, Users, Star, BadgeCheck, Banknote, ArrowRightLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { listGigs, type Gig } from "@/lib/api";

type GigFilter = "all" | "open" | "filled" | "completed";

const urgencyBadge = (u: string) => {
  switch (u) {
    case "URGENT": return { variant: "danger" as const, label: "URGENT" };
    case "TODAY": return { variant: "warning" as const, label: "TODAY" };
    default: return { variant: "secondary" as const, label: "FLEXIBLE" };
  }
};

const statusVariant = (s: string) =>
  s === "open" ? "success" as const : s === "filled" ? "default" as const : "secondary" as const;

const shiftLabel = (s: string) =>
  s === "morning" ? "AM (6am-2pm)" : s === "afternoon" ? "PM (2pm-10pm)" : s === "night" ? "Night (10pm-6am)" : "Full Day";

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<GigFilter>("all");

  useEffect(() => {
    listGigs({ page_size: 100 })
      .then((res) => setGigs(res.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-red-600">Failed to load gigs: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const filtered = filter === "all" ? gigs : gigs.filter((g) => g.status === filter);
  const openGigs = gigs.filter((g) => g.status === "open").length;
  const filledToday = gigs.filter((g) => g.status === "filled").length;
  const totalSlots = gigs.reduce((sum, g) => sum + g.slots_total, 0);
  const totalFilled = gigs.reduce((sum, g) => sum + g.slots_taken, 0);
  const tempToHireCount = gigs.filter((g) => g.temp_to_hire).length;
  const instantPayCount = gigs.filter((g) => g.instant_pay).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gig Marketplace</h1>
          <p className="text-gray-500">Post and manage same-day & next-day shifts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Post a Gig
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"><Zap className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Open Gigs</p><p className="text-xl font-bold text-gray-900">{openGigs}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><CheckCircle2 className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Filled Today</p><p className="text-xl font-bold text-gray-900">{filledToday}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><Users className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Total Slots</p><p className="text-xl font-bold text-gray-900">{totalSlots}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Clock className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Fill Rate</p><p className="text-xl font-bold text-gray-900">{totalSlots > 0 ? Math.round((totalFilled / totalSlots) * 100) : 0}%</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><ArrowRightLeft className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Temp-to-Hire</p><p className="text-xl font-bold text-gray-900">{tempToHireCount}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Banknote className="h-5 w-5" /></div>
            <div><p className="text-sm text-gray-500">Instant Pay</p><p className="text-xl font-bold text-gray-900">{instantPayCount}</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "open", "filled", "completed"] as GigFilter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
            filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}>
            {f}
          </button>
        ))}
      </div>

      {/* Gig Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((gig) => {
          const ub = urgencyBadge(gig.urgency);
          return (
            <Card key={gig.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{gig.title}</h3>
                      {gig.verified && <BadgeCheck className="h-4 w-4 text-blue-600" />}
                      <Badge variant={ub.variant}>{ub.label}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {gig.location}</span>
                      <span className="flex items-center gap-0.5"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {gig.rating}</span>
                    </div>
                  </div>
                  <Badge variant={statusVariant(gig.status)}>{gig.status}</Badge>
                </div>

                {/* Feature Tags */}
                {(gig.temp_to_hire || gig.instant_pay) && (
                  <div className="mt-2 flex gap-2">
                    {gig.temp_to_hire && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        <ArrowRightLeft className="h-3 w-3" /> Temp-to-Hire
                      </span>
                    )}
                    {gig.instant_pay && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        <Banknote className="h-3 w-3" /> Instant Pay
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-gray-50 p-2">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">{new Date(gig.date).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2">
                    <p className="text-xs text-gray-500">Shift</p>
                    <p className="text-sm font-medium text-gray-900">{shiftLabel(gig.shift)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2">
                    <p className="text-xs text-gray-500">Pay</p>
                    <p className="text-sm font-bold text-emerald-600">₱{gig.pay_per_shift}/day</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{gig.slots_taken}</span> / {gig.slots_total} slots filled
                  </div>
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                    <div className={cn("h-full rounded-full", gig.slots_taken === gig.slots_total ? "bg-green-500" : "bg-blue-500")} style={{ width: `${(gig.slots_taken / gig.slots_total) * 100}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
