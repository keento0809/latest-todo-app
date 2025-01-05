import { NextRequest, NextResponse } from "next/server";
export { auth as middlewareAuth } from "@/auth";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname, search } = request.nextUrl;
  const path = pathname + search;

  requestHeaders.set("x-path", path);

  return NextResponse.next({
    headers: requestHeaders,
  });
}
