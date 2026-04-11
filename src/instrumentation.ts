/**
 * Next.js instrumentation — runs once when the server starts.
 * Sets up a proxy dispatcher if HTTPS_PROXY is defined, so that
 * Node.js fetch (used by Supabase SDK) routes through corporate proxies.
 */
export async function register() {
  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxyUrl) {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
    console.log(`[proxy] Global fetch dispatcher set → ${proxyUrl}`);
  }
}
