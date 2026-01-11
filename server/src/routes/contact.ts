// src/routes/contact.ts
import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // SSL for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`, // authenticated sender
      to: process.env.EMAIL_USER, // your email
      replyTo: email, // user email for direct replies
      subject: `New message from ${name}`,
      text: message,
      html: `<p>${message}</p><p><strong>From:</strong> ${name} (${email})</p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
