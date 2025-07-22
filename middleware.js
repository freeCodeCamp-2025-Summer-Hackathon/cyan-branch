import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Check if the URL matches the pattern /voice-{token}
  if (pathname.startsWith("/voice-")) {
    const token = pathname.slice(7); // Remove '/voice-' prefix

    if (token && token.length > 0) {
      // Rewrite to the dynamic route handler
      await fetch(`${req.nextUrl.origin}/api/voicebox/${token}`);
    }
  }

  // Let everything else pass through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match voice token URLs - try a more specific pattern
    "/voice-:path*",
    // Alternative: catch all and filter in the function
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
