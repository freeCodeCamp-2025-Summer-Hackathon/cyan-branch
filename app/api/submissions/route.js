import { NextResponse } from "next/server";
import { createSubmission } from "@/prisma/queries";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const boxId = formData.get("boxId");
    const message = formData.get("message");

    if (!boxId || !message) {
      return NextResponse.json({ error: "boxId and message are required" }, { status: 400 });
    }

    await createSubmission(boxId, { message });

    // Redirect to thank you page
    return Response.redirect(new URL(`/submit/${boxId}/thanks`, request.url));
  }
  catch (error) {
    console.error("API submission POST error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
