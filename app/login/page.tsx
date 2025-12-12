"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Provider = "google" | "github";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [pending, setPending] = useState<null | Provider | "email">(null);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-500/35 to-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-gradient-to-tr from-fuchsia-500/25 to-purple-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0.25),rgba(0,0,0,0.85))]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            {/* Logo/Title */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <span className="text-sm font-semibold">EDU</span>
              </div>
              <div className="text-center">
                <h1 className="text-lg font-semibold tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs text-white/60">Sign in to continue</p>
              </div>
            </div>
            {/* Email/Password */}
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-white/70">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-white/70">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="text-[11px] text-white/55 hover:text-white/80"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>

                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-white/55 hover:text-white/80"
                >
                  Forgot?
                </Link>
              </div>

              <button
                type="submit"
                disabled={pending !== null}
                className="w-full rounded-2xl bg-white text-zinc-950 px-4 py-3 text-sm font-semibold transition hover:bg-white/90 disabled:opacity-60"
              >
                {pending === "email" ? "Signing in…" : "Sign in"}
              </button>
            </form>
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-white/50">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={pending !== null}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
              >
                <GoogleIcon className="h-4 w-4 opacity-90" />
                <span className="font-medium">
                  {pending === "google" ? "Connecting…" : "Google"}
                </span>
              </button>

              <button
                disabled={pending !== null}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
              >
                <GithubIcon className="h-4 w-4 opacity-90" />
                <span className="font-medium">
                  {pending === "github" ? "Connecting…" : "GitHub"}
                </span>
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-white/55">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-white/80 hover:text-white">
                Create one
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/40">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.5-5.4 3.5A6.2 6.2 0 1 1 12 5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4A9.8 9.8 0 1 0 12 21.8c5.7 0 9.4-4 9.4-9.6 0-.6-.1-1.1-.2-1.6H12Z"
      />
    </svg>
  );
}

function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .8A11.6 11.6 0 0 0 8.3 23c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C16.9 4 18 4.3 18 4.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.6 11.6 0 0 0 12 .8Z"
      />
    </svg>
  );
}
