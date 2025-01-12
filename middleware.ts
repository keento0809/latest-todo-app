import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async (request: NextRequest) => {
  const session = await auth();
  const url = request.nextUrl.clone();

  if (!session && url.pathname !== "/signin" && url.pathname !== "/signup") {
    url.pathname = "/signin";
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  const { pathname, search } = request.nextUrl;
  const path = pathname + search;

  requestHeaders.set("x-path", path);

  return NextResponse.next({
    headers: requestHeaders,
  });
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
