import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import type { Database } from "./lib/database.types";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // i18n-Routing nur für /de und /en (root '/' bleibt der bestehenden Marketing-Seite überlassen)
  if (pathname.startsWith("/de") || pathname.startsWith("/en")) {
    return intlMiddleware(request);
  }

  // Admin-Auth (bestehende Logik)
  if (pathname.startsWith("/admin")) {
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    if (!user.email || !adminEmails.includes(user.email)) {
      return NextResponse.redirect(
        new URL("/login?error=unauthorized", request.url)
      );
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(de|en)/:path*",
    "/admin/:path*",
  ],
};
