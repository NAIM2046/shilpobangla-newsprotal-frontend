import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // ==========================================
    // প্রজেক্টের রুট ডিরেক্টরি থেকে JSON ফাইলটি রিড করা
    // ==========================================
    const keyPath = path.join(process.cwd(), 'service-account.json');
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    // গুগলের সাথে কানেকশন তৈরি করা
   const jwtClient = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    // টোকেন নেওয়া
    const tokens = await jwtClient.authorize();

    // গুগলকে সিগন্যাল পাঠানো
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.access_token}`,
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED',
      }),
    });

    const data = await response.json();

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Indexing API Error:', error);
    return NextResponse.json({ error: 'Failed to notify Google' }, { status: 500 });
  }
}