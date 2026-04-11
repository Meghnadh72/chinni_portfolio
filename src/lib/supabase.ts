import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Route Node.js fetch through corporate proxy if HTTPS_PROXY is set
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
if (proxyUrl && typeof window === "undefined") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { ProxyAgent, setGlobalDispatcher } = require("undici");
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
  } catch {
    // undici not available — proxy won't be used
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Public client — read-only via RLS (null if env not configured)
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

// Admin client — bypasses RLS, server-side only (null if env not configured)
export const supabaseAdmin: SupabaseClient | null =
  url && serviceKey ? createClient(url, serviceKey) : null;
