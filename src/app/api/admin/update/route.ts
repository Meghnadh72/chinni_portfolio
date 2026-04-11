import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const ALLOWED_COLUMNS: Record<string, string[]> = {
  cp_site_settings: [
    "site_name", "tagline", "hero_heading", "hero_description", "hero_image",
    "contact_email", "contact_phone", "address",
    "instagram_url", "facebook_url", "youtube_url", "whatsapp_url",
  ],
  cp_photographer: [
    "name", "short_bio", "full_bio", "philosophy", "portrait", "achievements",
  ],
  cp_categories: ["title", "slug", "description", "order_rank"],
  cp_projects: [
    "title", "slug", "category", "cover_image", "gallery", "description",
    "client", "date", "featured", "tags",
  ],
  cp_services: [
    "title", "slug", "short_description", "cover_image", "price_range",
    "features", "icon", "order_rank",
  ],
  cp_testimonials: ["client_name", "client_role", "quote", "rating", "featured"],
  cp_events: [
    "title", "event_type", "date", "end_date", "location", "description",
    "registration_url", "cover_image",
  ],
};

const CRUD_TABLES = ["cp_projects", "cp_testimonials", "cp_services", "cp_events"];

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) return false;
  return true;
}

// Update a single field
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { table, rowId, column, value } = await req.json();

  if (!ALLOWED_COLUMNS[table]) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }
  if (!ALLOWED_COLUMNS[table].includes(column)) {
    return NextResponse.json({ error: "Invalid column" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from(table)
    .update({ [column]: value, updated_at: new Date().toISOString() })
    .eq("id", rowId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

// Create a new row
export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { table, data } = await req.json();

  if (!CRUD_TABLES.includes(table)) {
    return NextResponse.json({ error: "Create not allowed on this table" }, { status: 400 });
  }

  const allowed = ALLOWED_COLUMNS[table];
  const filtered: Record<string, unknown> = {};
  for (const key of Object.keys(data)) {
    if (allowed.includes(key) || key === "id") {
      filtered[key] = data[key];
    }
  }

  const { data: created, error } = await supabaseAdmin
    .from(table)
    .upsert(filtered)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, data: created });
}

// Delete a row
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { table, rowId } = await req.json();

  if (!CRUD_TABLES.includes(table)) {
    return NextResponse.json({ error: "Delete not allowed on this table" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from(table)
    .delete()
    .eq("id", rowId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
