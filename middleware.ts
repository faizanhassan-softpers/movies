import { NextRequest } from "next/server";
import { getSession, updateSession } from "./lib";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const updateSessionResponse = await updateSession(request);

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (session) {
      return Response.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return Response.redirect(new URL("/login", request.nextUrl));
    }
  }

  return updateSessionResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};