import { redirect } from "next/navigation";
import { getLinkByToken, isLinkActive, updateLinkIfExpired } from "@/utils/linkUtils";

export async function GET(request, { params }) {
  const { token } = await params;

  try {
    // Update the link if it has expired
    await updateLinkIfExpired(token);

    // Get the link
    const link = await getLinkByToken(token);

    if (!link) {
      redirect("/link-not-found");
    }

    if (!isLinkActive(link)) {
      redirect(`/link-expired/${token}`);
    }

    // Redirect to the actual submission page
    redirect(`/submit/${link.boxId}`);
  }
  catch (error) {
    console.error("Link validation error:", error);
    redirect("/error");
  }
}
