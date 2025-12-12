"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GithubIcon, GoogleIcon } from "../components/Icons";

type Provider = "google" | "github";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [pending, setPending] = useState<null | Provider | "signup">(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const passMismatch = useMemo(() => {
    if (!form.password || !form.confirmPassword) return false;
    return form.password !== form.confirmPassword;
  }, [form.password, form.confirmPassword]);

  async function signInSocial(provider: Provider) {
    try {
      setPending(provider);
      window.location.href = `/api/auth/${provider}`;
    } finally {
      setPending(null);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passMismatch) return;

    try {
      setPending("signup");

      // TODO: энд өөрийн signup API-гаа холбоно
      // await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: form.name,
      //     email: form.email,
      //     phone: form.phone,
      //     password: form.password,
      //   }),
      // });
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-zinc-900 text-white">
      {/* Background */}
 <div className="absolute inset-0 overflow-hidden">
        {/* Glow blobs */}
        <div
          className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full 
    bg-gradient-to-br from-sky-400/50 via-blue-500/30 to-cyan-300/20 
    blur-[120px]"
        />

        <div
          className="absolute top-1/3 -right-48 h-[520px] w-[520px] rounded-full 
    bg-gradient-to-tr from-fuchsia-500/45 via-purple-500/30 to-pink-400/20 
    blur-[120px]"
        />

        <div
          className="absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full 
    bg-gradient-to-tr from-emerald-400/30 via-teal-400/20 to-cyan-300/10 
    blur-[120px]"
        />

        {/* Aurora overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(0,0,0,0.25),rgba(0,0,0,0.9))]" />

        {/* Soft color wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/60" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
        
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}

            <div className="text-center">
              <h1 className="text-lg font-semibold tracking-tight">
                Create account
              </h1>
            </div>
           
            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                label="Full name"
                value={form.name}
                onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                placeholder="Your name"
                type="text"
                name="name"
              />

              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                placeholder="you@example.com"
                type="email"
                name="email"
              />

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
                  required
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className={[
                    "w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:bg-white/10",
                    "border-white/10 focus:border-white/20",
                  ].join(" ")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-white/70">
                    Confirm password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPass2((s) => !s)}
                    className="text-[11px] text-white/55 hover:text-white/80"
                  >
                    {showPass2 ? "Hide" : "Show"}
                  </button>
                </div>

                <input
                  name="confirmPassword"
                  required
                  type={showPass2 ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, confirmPassword: e.target.value }))
                  }
                  placeholder="••••••••"
                  className={[
                    "w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:bg-white/10",
                    passMismatch
                      ? "border-red-400/40 focus:border-red-400/60"
                      : "border-white/10 focus:border-white/20",
                  ].join(" ")}
                />

                {passMismatch && (
                  <p className="text-[11px] text-red-200/80">
                    Passwords do not match.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending !== null || passMismatch}
                className="w-full rounded-2xl bg-white text-zinc-950 px-4 py-3 text-sm font-semibold transition hover:bg-white/90 disabled:opacity-60"
              >
                {pending === "signup" ? "Creating…" : "Create account"}
              </button>
            </form>
             <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-white/50">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

              {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => signInSocial("google")}
                disabled={pending !== null}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
              >
                <GoogleIcon className="h-4 w-4 opacity-90" />
                <span className="font-medium">
                  {pending === "google" ? "Connecting…" : "Google"}
                </span>
              </button>

              <button
                onClick={() => signInSocial("github")}
                disabled={pending !== null}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
              >
                <GithubIcon className="h-4 w-4 opacity-90" />
                <span className="font-medium">
                  {pending === "github" ? "Connecting…" : "GitHub"}
                </span>
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-white/55">
              Already have an account?{" "}
              <Link href="/login" className="text-white/80 hover:text-white">
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/40">
            By creating an account, you agree to our{" "}
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

function Field({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/70">{label}</label>
      <input
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
      />
    </div>
  );
}

