"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/admin";
import { LEAD_STATUSES } from "@/lib/lead-options";

const updateSchema = z.object({
  id: z.uuid(),
  status: z.enum(LEAD_STATUSES),
  notes: z.string().trim().max(2000, "Notes must be at most 2000 characters"),
});

export type UpdateState = { ok?: boolean; error?: string };

// Server actions are public POST endpoints, so each one re-checks the admin session itself.
export async function updateLead(_prev: UpdateState, formData: FormData): Promise<UpdateState> {
  await requireAdmin();
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  try {
    await db()
      .update(schema.leads)
      .set({ status: parsed.data.status, notes: parsed.data.notes || null })
      .where(eq(schema.leads.id, parsed.data.id));
  } catch (err) {
    console.error("[admin] failed to update lead", err);
    return { error: "Couldn't save changes. Please try again." };
  }
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${parsed.data.id}`);
  return { ok: true };
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) redirect("/admin");
  try {
    await db().delete(schema.leads).where(eq(schema.leads.id, id.data));
  } catch (err) {
    console.error("[admin] failed to delete lead", err);
    throw new Error("Couldn't delete the lead.");
  }
  revalidatePath("/admin");
  redirect("/admin");
}
