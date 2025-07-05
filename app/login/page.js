'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
}