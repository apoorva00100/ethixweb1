import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAdminEmail } from "@/lib/admin-emails";
import { createSupabase } from "@/lib/supabase/server";

/** The signed-in admin, or null. Uses getUser(), which re-validates the token with Supabase. */
export async function getAdminUser() {
  // Admin data is per-request by nature. Opting out of prerendering/prefetch simulation here keeps the
  // session check (which reads the clock to validate token expiry) from running at "build time".
  await connection();
  const supabase = await createSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user && isAdminEmail(data.user.email) ? data.user : null;
}

/**
 * Call at the top of every admin page and server action. proxy.ts redirects early, but it is only a
 * convenience: layouts don't re-run on client navigation and server actions are public POST endpoints,
 * so each one must verify the session itself.
 */
export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
