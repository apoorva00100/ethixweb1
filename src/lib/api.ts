import { NextResponse } from "next/server";

export type ApiErrorBody = {
  error: { code: string; message: string; fields?: Record<string, string[]> };
};

/** Every API failure uses this one shape so clients can handle errors uniformly. */
export function apiError(
  status: number,
  code: string,
  message: string,
  extra?: { fields?: Record<string, string[]>; headers?: Record<string, string> },
) {
  const body: ApiErrorBody = { error: { code, message, fields: extra?.fields } };
  return NextResponse.json(body, { status, headers: extra?.headers });
}
