"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { isAllowedAdmin } from "@/lib/admin-access";

export type LoginState = { error?: string } | null;

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createServerSupabase();
  if (!supabase) {
    return { error: "Database not configured. Add your Supabase keys first." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  // Enforce the admin allowlist (if configured) even after a valid sign-in.
  if (!isAllowedAdmin(data.user?.email)) {
    await supabase.auth.signOut();
    return { error: "This account isn't authorised for admin access." };
  }

  redirect("/admin");
}
