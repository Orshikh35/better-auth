"use client"
import { authClient } from "@/lib/auth-client";
import React from "react";
import { set } from "zod";

interface ResendVerificationButtonProps {
    email: string;
}

export default function ResendVerificationButton({ email }: ResendVerificationButtonProps) {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] =  React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    async function resendVerificationEmail() {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const {error} = await authClient.sendVerificationEmail({
            email,
            callbackURL: "/email-verified",
        })

        setLoading(false);
        
        if (error) {
            setError(error.message || "An error occurred");
        } else {
            setSuccess("Verification email resent successfully");
        }
    }
    return (
      <div className="space-y-4">
        {success && (
            <div role="status" className="text-green-600">
                {success}
            </div>
        )}
        {error && (
            <div role="alert" className="text-red-600">
                {error}
            </div>
        )}
        <button
            onClick={resendVerificationEmail}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? "Resending..." : "Resend Verification Email"}
        </button>
      </div>
    );
}