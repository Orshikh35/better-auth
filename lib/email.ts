import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailValues) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing");
  }

  await resend.emails.send({
    from: "verification@codingflow-sample.com" , // ✅ TEST дээр ингэж эхэл
    to,
    subject,
    text,
  });
}
