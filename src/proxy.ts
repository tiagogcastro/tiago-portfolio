import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const defaultPrefix = `/${routing.defaultLocale}`;
  const pathnameLocale = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const isInternalLocaleRewrite =
    request.headers.get("x-internal-locale-rewrite") === "1";

  if (pathnameLocale === routing.defaultLocale) {
    if (isInternalLocaleRewrite) return NextResponse.next();

    const publicPath = pathname.slice(defaultPrefix.length) || "/";
    return NextResponse.redirect(new URL(publicPath, request.url));
  }

  if (pathnameLocale) return NextResponse.next();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-internal-locale-rewrite", "1");

  return NextResponse.rewrite(
    new URL(`${defaultPrefix}${pathname === "/" ? "" : pathname}`, request.url),
    { request: { headers: requestHeaders } },
  );
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|apple-icon|.*\\..*).*)",
};
