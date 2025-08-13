import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate the request data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically send the email using a service like Resend
    // For now, we'll just log it
    console.log('Received contact form submission:', {
      name,
      email,
      subject,
      message,
    });

    const { error } = await resend.emails.send({
      from: 'Taulant Portfolio <onboarding@resend.dev>',
      to: ['taulant1995@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}

            Message:
            ${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
