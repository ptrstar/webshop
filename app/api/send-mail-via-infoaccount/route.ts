// app/api/send-confirmation-email/route.ts
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  try {

    const { recipientEmail, subject, body } = await req.json();

    // 1. Create a Nodemailer transporter using your Zmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.ZMAIL_SMTP_HOST,
      port: Number(process.env.ZMAIL_SMTP_PORT), // Port 587 is typically not secure, use 465 for secure, or configure secure: false with 587 and STARTTLS
      secure: true, // Use 'true' if port is 465 (SSL/TLS), 'false' if port is 587 (STARTTLS)
      auth: {
        user: process.env.ZMAIL_SMTP_USER,
        pass: process.env.ZMAIL_SMTP_PASS,
      },
    });

    // 2. Define the email options
    const mailOptions = {
      from: `Richi - Das Kartenspiel <${process.env.ZMAIL_SMTP_USER}>`, // Sender address
      to: recipientEmail, // Recipient's email address (e.g., the new user)
      subject: subject, // Email subject
      html: body, // HTML body content
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Confirmation email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ message: 'Failed to send confirmation email' }, { status: 500 });
  }
}
