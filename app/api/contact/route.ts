import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/db/schema';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Basic in-memory rate limiting (IP-based)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    
    let rateLimitInfo = rateLimitMap.get(ip);
    if (!rateLimitInfo || now - rateLimitInfo.lastReset > RATE_LIMIT_WINDOW) {
      rateLimitInfo = { count: 1, lastReset: now };
    } else {
      rateLimitInfo.count++;
    }
    rateLimitMap.set(ip, rateLimitInfo);

    if (rateLimitInfo.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.' }, { status: 429 });
    }

    // 2. Data Parsing & Validation
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 });
    }
    if (!subject || typeof subject !== 'string' || subject.trim() === '') {
      return NextResponse.json({ error: 'Subjek wajib diisi' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Pesan wajib diisi' }, { status: 400 });
    }

    // 3. Save to Database
    await db.insert(contactMessages).values({
      senderName: name.trim(),
      senderEmail: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // 4. Send Email Notification
    if (resend) {
      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['admin@bprri.or.id'], // Or any configured receiver
        subject: `Pesan Baru: ${subject}`,
        html: `
          <h3>Pesan Baru dari Form Kontak BPR-RI</h3>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subjek:</strong> ${subject}</p>
          <hr />
          <p><strong>Pesan:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Pesan berhasil dikirim!' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
