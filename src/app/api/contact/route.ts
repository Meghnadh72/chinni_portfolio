import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (e.g., Resend, SendGrid, or EmailJS)
    // For now, log the submission
    console.log("Contact form submission:", { name, email, phone, service, message });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
