import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLink } from "@/components/site/admin-link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { signOut } from "../login/actions";

export const metadata: Metadata = { title: "Admin | Ethixweb India", robots: { index: false, follow: false } };

// The layout itself is static. The signed-in user's email is read inside <Suspense>, and each page
// verifies the session on its own (layouts don't re-run on client navigation).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-6">
            <Logo />
            <AdminLink href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Leads
            </AdminLink>
          </div>
          <div className="flex items-center gap-3">
            <Suspense fallback={null}>
              <AdminEmail />
            </Suspense>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm" className="gap-1.5">
                <LogOut /> Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}

async function AdminEmail() {
  const user = await requireAdmin();
  return <span className="hidden text-sm text-muted-foreground sm:block">{user.email}</span>;
}
