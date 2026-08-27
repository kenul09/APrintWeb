import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env";

export interface ContactNotificationInput {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  createdAt: Date;
}

let transporter: Transporter | null = null;
let warnedMissingConfig = false;

// Lazily builds the SMTP transporter from env vars. Returns null (instead of
// throwing) when MAIL_* isn't configured yet, so a contact submission still
// succeeds and gets saved — email is a notification on top of that, not a
// requirement for it.
function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  if (!env.mail.host || !env.mail.user || !env.mail.password) {
    if (!warnedMissingConfig) {
      console.warn(
        "[email.service] MAIL_HOST/MAIL_USER/MAIL_PASSWORD are not set — " +
          "contact notification emails will be skipped. See apps/backend/README.md."
      );
      warnedMissingConfig = true;
    }
    return null;
  }

  transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.port === 465,
    auth: { user: env.mail.user, pass: env.mail.password },
  });

  return transporter;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("az-AZ", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Baku",
  }).format(date);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSubject(service?: string | null): string {
  return service ? `Yeni sifariş — ${service} | A Print` : "Yeni sifariş — A Print";
}

function buildText(contact: ContactNotificationInput): string {
  return [
    "A Print — Yeni sifariş",
    "",
    `Ad Soyad: ${contact.name}`,
    `Email: ${contact.email}`,
    `Telefon: ${contact.phone || "—"}`,
    `Xidmət: ${contact.service || "—"}`,
    `Mesaj: ${contact.message}`,
    `Tarix: ${formatDate(contact.createdAt)}`,
  ].join("\n");
}

function buildHtml(contact: ContactNotificationInput): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;color:#8b8b96;font-size:13px;width:120px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${label}</td>
      <td style="padding:10px 0;color:#14121a;font-size:14px;font-family:Arial,Helvetica,sans-serif;">${value}</td>
    </tr>`;

  return `<div style="background:#f5f4f7;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eceaf0;">
    <div style="background:linear-gradient(135deg,#8b5cf6,#ec4899);padding:24px 28px;">
      <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.04em;font-family:Arial,Helvetica,sans-serif;">A PRINT</div>
      <div style="color:rgba(255,255,255,0.9);font-size:13px;margin-top:4px;font-family:Arial,Helvetica,sans-serif;">Yeni sifariş / əlaqə müraciəti</div>
    </div>
    <div style="padding:24px 28px;">
      <table role="presentation" width="100%" style="border-collapse:collapse;">
        ${row("Ad Soyad", escapeHtml(contact.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(contact.email)}" style="color:#8b5cf6;text-decoration:none;">${escapeHtml(contact.email)}</a>`)}
        ${row("Telefon", contact.phone ? escapeHtml(contact.phone) : "—")}
        ${row("Xidmət", contact.service ? escapeHtml(contact.service) : "—")}
        ${row("Mesaj", escapeHtml(contact.message).replace(/\n/g, "<br/>"))}
        ${row("Tarix", formatDate(contact.createdAt))}
      </table>
    </div>
    <div style="padding:16px 28px;background:#f5f4f7;color:#8b8b96;font-size:12px;font-family:Arial,Helvetica,sans-serif;">
      Bu mesaj A Print veb saytının əlaqə formu vasitəsilə göndərilib.
    </div>
  </div>
</div>`;
}

export async function sendContactNotification(contact: ContactNotificationInput) {
  const client = getTransporter();
  if (!client) return null;

  return client.sendMail({
    from: `"A Print Website" <${env.mail.from}>`,
    to: env.adminEmail,
    replyTo: contact.email,
    subject: buildSubject(contact.service),
    text: buildText(contact),
    html: buildHtml(contact),
  });
}
