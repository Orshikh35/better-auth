import { getServerSession } from "@/lib/server";
import { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import React from "react";
import ResendVerificationButton from "./resend-verification-button";

export const metadata: Metadata = {
  title: "Email Verified",
};

export default async function EmailVerifiedPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  if (user.emailVerified === true ) redirect("/admin");

  return (
   <main>
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Email Verification Required</h1>
      <p className="mb-4">
        Please verify your email address to continue. A verification link has
        been sent to <strong>{user.email}</strong>.
      </p>
      <ResendVerificationButton email={user.email} />
    </div>
   </main>
  );
}
