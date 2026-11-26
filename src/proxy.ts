import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCardHost =
    request.headers.get("host")?.split(":")[0] ===
    "contato.tiagogcastro.com.br";
  if (isCardHost && (pathname === "/pt-BR" || pathname === "/pt-BR/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    isCardHost &&
    (pathname === "/contato" ||
      /^\/(en-US|es-ES|pt-BR)\/contato\/?$/.test(pathname))
  ) {
    const locale = pathname.match(/^\/(en-US|es-ES|pt-BR)/)?.[1];
    return NextResponse.redirect(
      new URL(locale && locale !== "pt-BR" ? `/${locale}` : "/", request.url),
    );
  }
  if (
    isCardHost &&
    (pathname === "/" || /^\/(en-US|es-ES|pt-BR)\/?$/.test(pathname))
  ) {
    const locale =
      pathname.match(/^\/(en-US|es-ES|pt-BR)/)?.[1] ?? routing.defaultLocale;
    return NextResponse.rewrite(new URL(`/${locale}/contato`, request.url));
  }
  if (isCardHost)
    return NextResponse.redirect(new URL(`${siteConfig.domain}${pathname}`));
  if (
    request.headers.get("host")?.split(":")[0] === "tiagogcastro.com.br" &&
    /^(\/(en-US|es-ES))?\/contato\/?$/.test(pathname)
  ) {
    const locale = pathname.match(/^\/(en-US|es-ES)/)?.[1];
    return NextResponse.redirect(
      new URL(`${siteConfig.cardDomain}${locale ? `/${locale}` : ""}`),
    );
  }
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
  matcher: "/((?!api|trpc|_next|_vercel|manifest|opengraph-image|.*\\..*).*)",
};
