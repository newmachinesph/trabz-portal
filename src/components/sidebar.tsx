"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  BarChart3,
  Brain,
  CalendarDays,
  MessageSquare,
  Bell,
  FileText,
  Download,
  CreditCard,
  Settings,
  Users,
  Shield,
  LogOut,
  Store,
  ClipboardCheck,
  Star,
  Banknote,
  ShieldCheck,
  UsersRound,
  UserCog,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/company", label: "Company", icon: Building2 },
];

const insightsNav = [
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/kayascore", label: "KayaScore", icon: Brain },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

const operationsNav = [
  { href: "/dashboard/gigs", label: "Gig Marketplace", icon: Store },
  { href: "/dashboard/shifts", label: "Shifts", icon: CalendarDays },
  { href: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/dashboard/performance", label: "Performance", icon: Star },
  { href: "/dashboard/payroll", label: "Payroll", icon: Banknote },
  { href: "/dashboard/bulk-hiring", label: "Bulk Hiring", icon: UsersRound },
  { href: "/dashboard/compliance", label: "DOLE Compliance", icon: ShieldCheck },
];

const manageNav = [
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/reports", label: "Reports", icon: Download },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminItems = [
  { href: "/admin", label: "Admin Panel", icon: Shield },
  { href: "/admin/contacts", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/impersonate", label: "Impersonate", icon: UserCog },
];

function NavGroup({ items, pathname }: { items: typeof mainNav; pathname: string }) {
  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Trabz" width={105} height={28} className="h-7 w-auto" />
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-primary">
            Portal
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-4">
        <NavGroup items={mainNav} pathname={pathname} />

        <div className="my-3 border-t border-gray-200" />
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Insights</p>
        <NavGroup items={insightsNav} pathname={pathname} />

        <div className="my-3 border-t border-gray-200" />
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Operations</p>
        <NavGroup items={operationsNav} pathname={pathname} />

        <div className="my-3 border-t border-gray-200" />
        <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Manage</p>
        <NavGroup items={manageNav} pathname={pathname} />

        {user?.role === "admin" && (
          <>
            <div className="my-3 border-t border-gray-200" />
            <NavGroup items={adminItems} pathname={pathname} />
          </>
        )}
      </nav>

      {/* External links */}
      <div className="border-t border-gray-200 px-4 pt-3">
        <div className="flex gap-2">
          <a
            href="https://trabz.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <ExternalLink className="h-3 w-3" />
            Website
          </a>
          <a
            href="https://app.trabz.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <ExternalLink className="h-3 w-3" />
            Worker App
          </a>
        </div>
      </div>

      {/* User footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 text-sm">
          <p className="font-medium text-gray-900">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
