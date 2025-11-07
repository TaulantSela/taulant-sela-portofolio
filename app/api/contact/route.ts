import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate the request data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_RECIPIENT_EMAIL } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error('Email configuration is missing. Please set GMAIL_USER and GMAIL_APP_PASSWORD.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `Portfolio Contact <${GMAIL_USER}>`,
        to: CONTACT_RECIPIENT_EMAIL || GMAIL_USER,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
    } catch (error) {
      console.error('Email error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
