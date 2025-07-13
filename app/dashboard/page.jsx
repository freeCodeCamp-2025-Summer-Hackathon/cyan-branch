"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Prevent unregistered users from accessing admin dashboard
      signIn("google", { callbackUrl: "/dashboard" });
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <main>
        <h1>Admin Dashboard</h1>
        <h2>
          Welcome
          {session?.user?.name ?? "Unknown User"}
        </h2>
      </main>
    );
  }

  // Fallback, can probably be improved to something in the future
  return null;
}
