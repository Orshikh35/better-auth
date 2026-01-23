"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="grid gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => signIn("azure-ad")}
        >
          Sign in with Microsoft
        </button>

      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <div>Signed in as: {session.user?.email ?? session.user?.name}</div>
      <img
        src={session.user?.image ?? ""}
        alt="avatar"
        width={48}
        height={48}
        style={{ borderRadius: 9999, objectFit: "cover" }}
      />
      <div>
        <b>{session.user?.name}</b>
      </div>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
