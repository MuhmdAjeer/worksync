import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("jwt")?.value;
  if (!cookies && !request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  if (cookies && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
