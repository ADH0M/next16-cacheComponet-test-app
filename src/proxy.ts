import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";


export default async function proxy(request: NextRequest) {

  const pathnames = request.nextUrl;

  if (pathnames.pathname.endsWith("user") ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  

  // Step 1: Use the incoming request (example)
  const defaultLocale =
    request.headers.get("x-your-custom-locale") === "ar"
      ? "ar"
      : ("en" as "en" | "ar");
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: ["en", "ar"],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
