"use client";

import { useEffect, useState } from "react";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityResult = Record<string, any> | Record<string, any>[] | null;

export function useSanityQuery(query: string): { data: SanityResult; loading: boolean } {
  const [data, setData] = useState<SanityResult>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(query)
      .then((result) => {
        if (!cancelled && result) setData(result);
      })
      .catch(() => {
        // Silently fall back to demo data
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [query]);

  return { data, loading };
}
