// src/app/api/send-email/route.js
console.log('API route loaded');
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Сайт-портфолио <onboarding@resend.dev>',
      to: ['korzhenkovanton322@yandex.ru'],
      subject: `Новое сообщение от ${name}`,
      replyTo: email,
      html: `
        <h2>Новое сообщение с сайта-портфолио</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}