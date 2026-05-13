import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/utils';

/**
 * Contact form submission endpoint.
 * Sends email via Resend if configured, otherwise logs the submission.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    const errors = validateContactForm({ name, email, message });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Send email via Resend if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: 'OfekLabs Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'ofeklabs@outlook.com',
        replyTo: email,
        subject: `Contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } else {
      // Log submission when Resend is not configured
      console.info('[Contact Form]', { name, email, message: message.substring(0, 50) + '...' });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
