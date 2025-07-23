import { NextResponse } from "next/server";
import { getLinkByToken, isLinkActive } from "@/utils/linkUtils";

export async function GET(request, { params }) {
  const { token } = await params;

  try {
    // Get the link
    const link = await getLinkByToken(token);

    if (!link) {
      return NextResponse.redirect(`${request.nextUrl.origin}/link-not-found`, 301);
    }

    if (!isLinkActive(link)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/link-expired/${token}`, 301);
    }

    // Redirect to the actual submission page
    return NextResponse.redirect(`${request.nextUrl.origin}/submit/${link.boxId}`, 301);
  }
  catch (error) {
    console.error("Link validation error:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/error`);
  }
}
