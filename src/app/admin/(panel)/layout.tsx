import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { isAllowedAdmin } from "@/lib/admin-access";
import { AdminShell } from "@/features/admin/admin-shell";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabase();
  const { data } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  if (!data.user || !isAllowedAdmin(data.user.email)) redirect("/admin/login");

  return <AdminShell email={data.user.email}>{children}</AdminShell>;
}
