
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { assert } from "console";
import { cookies } from "next/headers";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const resolvedCookies = await cookieStore;
          return resolvedCookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) => {
              const resolvedCookies = await cookieStore;
              resolvedCookies.set(name, value, options);
            });
          } catch {
            assert("supabase docs sais this should never happen");
          }
        },
      },
    },
  );
};
