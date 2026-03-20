import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Create transporter (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_CLIENT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // =========================
    // 1. Send message TO YOU
    // =========================
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_CLIENT}>`,
      replyTo: email, // so you can reply directly to client
      to: process.env.EMAIL_CLIENT,
      subject: `📩 New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    // =========================
    // 2. Auto-reply TO CLIENT
    // =========================
    await transporter.sendMail({
      from: `"Rhen" <${process.env.EMAIL_CLIENT}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out! I’ve received your message and will get back to you as soon as possible.</p>
          <p>Looking forward to working with you </p>
          <br/>
          <p>- Rhen</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}