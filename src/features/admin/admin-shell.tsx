"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/treatments", label: "Treatments", icon: Sparkles },
  { href: "/admin/staff", label: "Specialists", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export function AdminShell({
  children,
  email,
}: {
  children: ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-cream text-graphite lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col gap-1 border-b border-stone/40 bg-pearl-gradient p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="mb-6 px-2 pt-1">
          <Wordmark href="/admin" size="sm" className="items-start text-graphite" />
          <p className="mt-1 font-sans text-[0.55rem] uppercase tracking-luxe text-taupe">
            Management
          </p>
        </div>
        <nav className="flex gap-1 lg:flex-col">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 font-sans text-sm transition-colors",
                  active
                    ? "bg-graphite text-cream"
                    : "text-charcoal/70 hover:bg-white/60",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-stone/40 pt-4 lg:block">
          <p className="truncate px-2 font-sans text-[0.6rem] text-taupe">{email}</p>
          <form action={signOut}>
            <button className="mt-2 flex w-full items-center gap-2 rounded-2xl px-4 py-2.5 font-sans text-[0.7rem] uppercase tracking-wide2 text-charcoal/70 transition-colors hover:bg-white/60">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
