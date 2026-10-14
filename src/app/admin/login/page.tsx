import type { Metadata } from "next";
import { Logo } from "@/components/site/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-border bg-card p-7 shadow-2xl shadow-black/30">
          <h1 className="text-xl font-bold">Admin sign in</h1>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">Manage enquiries from the website.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
