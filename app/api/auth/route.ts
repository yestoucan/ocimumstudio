import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json(
      { error: "Mot de passe incorrect" },
      { status: 401 }
    );
  }

  // Optional: notify on access. Add the `resend` package + RESEND_API_KEY
  // and NOTIFICATION_EMAIL env vars, then uncomment to enable (see xaya).
  //
  // const now = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Ocimum Studio <noreply@yourdomain.dev>",
  //   to: process.env.NOTIFICATION_EMAIL!,
  //   subject: "Nouveau visiteur sur Ocimum Studio",
  //   text: `Un visiteur a accédé au site le ${now}.`,
  // });

  const response = NextResponse.json({ success: true });
  response.cookies.set("site_access", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
