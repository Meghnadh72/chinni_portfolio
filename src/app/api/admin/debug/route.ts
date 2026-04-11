import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length ?? 0,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    envKeys: Object.keys(process.env).filter(k =>
      k.includes("ADMIN") || k.includes("JWT") || k.includes("SUPABASE") || k.includes("SANITY")
    ),
  });
}
