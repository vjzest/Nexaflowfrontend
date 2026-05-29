import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
    try {
        const { to, message } = await request.json();

        // Twilio credentials from environment variables
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        if (!accountSid || !authToken || !fromNumber) {
            return NextResponse.json({ error: 'Twilio credentials missing in env' }, { status: 500 });
        }

        const client = twilio(accountSid, authToken);

        const twilioResponse = await client.messages.create({
            body: message,
            from: fromNumber,
            to: to
        });

        return NextResponse.json({ success: true, messageId: twilioResponse.sid });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
