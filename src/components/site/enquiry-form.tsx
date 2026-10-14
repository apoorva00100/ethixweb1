"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/lead-options";
import { enquirySchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;
type State = { status: "idle" | "sending" | "success" } | { status: "error"; message: string };

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-input/30 px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-primary-text">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>({ status: "idle" });
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const err = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...fd, startedAt: startedAt.current ?? undefined };

    const check = enquirySchema.safeParse(payload);
    if (!check.success) {
      const fields = z.flattenError(check.error).fieldErrors as Record<string, string[]>;
      setErrors(Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v[0]])));
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setErrors({});
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return setState({ status: "success" });
      const body = await res.json().catch(() => null);
      if (res.status === 422 && body?.error?.fields) {
        setErrors(Object.fromEntries(Object.entries(body.error.fields as Record<string, string[]>).map(([k, v]) => [k, v[0]])));
        return setState({ status: "idle" });
      }
      setState({ status: "error", message: body?.error?.message ?? "Something went wrong. Please try again." });
    } catch {
      setState({ status: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <CheckCircle2 className="size-12 text-teal" />
        <h2 className="mt-5 text-2xl font-bold">Thanks, we&apos;ve got it.</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">
          A senior member of the team will reply within one working day. Keep an eye on your inbox and phone.
        </p>
      </div>
    );
  }

  const sending = state.status === "sending";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required {...err("name")} />
        </Field>
        <Field id="company" label="Company (optional)" error={errors.company}>
          <Input id="company" name="company" autoComplete="organization" {...err("company")} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required {...err("email")} />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone} hint="10-digit Indian mobile, e.g. 98765 43210">
          <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" required {...err("phone")} />
        </Field>
        <Field id="city" label="City" error={errors.city}>
          <Input id="city" name="city" autoComplete="address-level2" required {...err("city")} />
        </Field>
        <Field id="service" label="What do you need?" error={errors.service}>
          <select id="service" name="service" defaultValue="" required className={selectClass} {...err("service")}>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field id="budget" label="Budget (₹)" error={errors.budget}>
        <select id="budget" name="budget" defaultValue="" required className={selectClass} {...err("budget")}>
          <option value="" disabled>Select a range</option>
          {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <Field id="message" label="Tell us about your business" error={errors.message}>
        <Textarea id="message" name="message" rows={5} required {...err("message")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-primary-text" />
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={sending} className={cn("h-12 w-full rounded-full text-base font-bold")}>
        {sending ? <><Loader2 className="animate-spin" /> Sending…</> : "Send enquiry"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        We use your details only to reply to this enquiry. No spam, ever.
      </p>
    </form>
  );
}
