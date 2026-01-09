import { NextResponse } from "next/server";
import { transporter } from "@/app/lib/mailer";

export async function POST(req: Request) {
  const { to, orderId, total } = await req.json();

  const noirTemplate = `
    <div style="background-color: #000; color: #fff; font-family: sans-serif; padding: 50px; text-transform: uppercase;">
      <div style="border: 1px solid #333; padding: 40px; max-width: 600px; margin: auto;">
        <p style="font-size: 10px; letter-spacing: 5px; color: #666; margin-bottom: 25px;">// ACQUISITION_MANIFEST</p>
        <h1 style="font-size: 38px; font-weight: 900; font-style: italic; margin: 0; letter-spacing: -2px;">3DX_PARTICLES.</h1>
        <div style="margin: 40px 0; border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 25px 0;">
          <p style="font-size: 11px; margin: 12px 0;"><span style="color: #666;">ORDER_REF:</span> #${orderId.slice(-8).toUpperCase()}</p>
          <p style="font-size: 11px; margin: 12px 0;"><span style="color: #666;">TOTAL_SETTLEMENT:</span> ₹${total}</p>
        </div>
        <p style="font-size: 10px; color: #444; margin-top: 40px;">MANIFEST_LOCKED. DISPATCH_PENDING.</p>
        <div style="margin-top: 50px;">
          <a href="${process.env.NEXTAUTH_URL}/track?id=${orderId}" style="display: inline-block; background-color: #fff; color: #000; padding: 18px 35px; text-decoration: none; font-size: 10px; font-weight: bold; letter-spacing: 3px;">TRACK_DISPATCH</a>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"3DX Particles" <${process.env.MAIL_USER}>`,
    to,
    subject: `CONFIRMED: ORDER #${orderId.slice(-8).toUpperCase()}`,
    html: noirTemplate,
  });

  return NextResponse.json({ success: true });
}