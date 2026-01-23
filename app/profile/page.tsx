"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  console.log("user:", user);
  useEffect(() => {
    if (!isLoading && (error || !user)) {
      router.replace("/login");
    }
  }, [isLoading, error, user, router]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="mx-auto max-w-md rounded-2xl bg-white/5 p-6">
        <h1 className="text-xl font-semibold">Profile</h1>

        <div className="mt-4 flex items-center gap-4">
          {user.picture && (
            <img
              src={user.picture}
              alt="avatar"
              width={56}
              height={56}
              className="rounded-full"
            />
          )}

          <div>
            <p className="text-sm text-white/60">Name</p>
            <p>{user.name}</p>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <p className="text-white/60">Email</p>
          <p>{user.email}</p>
        </div>

        {/* ⚠️ Auth0 SDK logout route */}
        <a href="/auth/logout?returnTo=http://localhost:3000">Logout</a>
      </div>
    </div>
  );
}
