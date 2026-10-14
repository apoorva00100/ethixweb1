"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin-emails";
import { createSupabase } from "@/lib/supabase/server";

const credentials = z.object({ email: z.email().max(254), password: z.string().min(1).max(200) });

export type LoginState = { error?: string };

// One generic message for every failure, so the form never reveals which emails exist.
const FAIL: LoginState = { error: "Invalid email or password." };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return FAIL;

  const supabase = await createSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email.trim().toLowerCase(),
    password: parsed.data.password,
  });
  if (error || !data.user) return FAIL;

  // Signed in with Supabase, but not on the admin allow-list: undo it.
  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return FAIL;
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
