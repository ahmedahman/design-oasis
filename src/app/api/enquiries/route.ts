import { NextResponse } from "next/server";

import { enquirySchema } from "@/features/enquiries/lib/schema";

/**
 * The single enquiry endpoint. Both the contact form and the land submission
 * POST here, so there is one place to add delivery (email, CRM) later.
 *
 * BFF only — no business logic beyond validation.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some details need another look.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // TODO: deliver. Until RESEND_API_KEY and ENQUIRY_TO_EMAIL are set this logs
  // and succeeds, so the form is testable end to end without a mail provider.
  console.info("[enquiry]", {
    kind: parsed.data.kind,
    name: parsed.data.name,
    email: parsed.data.email,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
