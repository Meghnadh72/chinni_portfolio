import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ isAdmin: false });

  const valid = await verifyAdminToken(token);
  return NextResponse.json({ isAdmin: valid });
}
