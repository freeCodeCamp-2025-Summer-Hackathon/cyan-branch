import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function SubmitPage({ params }) {
  const { boxId } = await params;

  const box = await prisma.box.findUnique({
    where: { id: boxId },
  });

  if (!box) {
    notFound();
  }

  return (
    <main>
      <h1>
        Submit Feedback for:
        {box.name}
      </h1>
      <form method="POST" action="/api/submissions">
        <input type="hidden" name="boxId" value={boxId} />
        <textarea name="message" placeholder="Your feedback..." required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
