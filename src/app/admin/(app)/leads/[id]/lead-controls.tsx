"use client";

import { useActionState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/lead-options";
import { deleteLead, updateLead, type UpdateState } from "../../actions";

export function LeadControls({ id, status, notes }: { id: string; status: LeadStatus; notes: string | null }) {
  const [state, action, pending] = useActionState<UpdateState, FormData>(updateLead, {});
  return (
    <div className="space-y-8">
      <form action={action} className="space-y-5">
        <input type="hidden" name="id" value={id} />
        <div className="space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={status}
            className="h-9 w-full rounded-lg border border-input bg-input/30 px-2.5 text-sm capitalize outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notes">Internal notes</Label>
          <Textarea id="notes" name="notes" rows={5} defaultValue={notes ?? ""} placeholder="Call outcomes, next steps…" />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={pending} className="rounded-full px-6">
            {pending ? <><Loader2 className="animate-spin" /> Saving…</> : "Save changes"}
          </Button>
          {state.ok && !pending && <span role="status" className="text-sm text-teal">Saved</span>}
          {state.error && <span role="alert" className="text-sm text-primary-text">{state.error}</span>}
        </div>
      </form>
      <form
        action={deleteLead}
        onSubmit={(e) => {
          if (!window.confirm("Delete this lead permanently? This can't be undone.")) e.preventDefault();
        }}
        className="border-t border-border pt-6"
      >
        <input type="hidden" name="id" value={id} />
        <Button type="submit" variant="destructive" size="sm" className="gap-1.5">
          <Trash2 /> Delete lead
        </Button>
      </form>
    </div>
  );
}
