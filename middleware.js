import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Check if the URL matches the pattern /voice-{token}
  if (pathname.startsWith("/voice-")) {
    const token = pathname.slice(7); // Remove '/voice-' prefix

    if (token && token.length > 0) {
      // Rewrite to the API route
      url.pathname = `/api/voicebox/${token}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/voice-:path*",
  ],
};
