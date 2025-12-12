"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
          {/* Header */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <span className="text-sm font-semibold">EDU</span>
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold tracking-tight">
                Create account
              </h1>
              <p className="text-xs text-white/60">Join and start learning</p>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
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

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-white/50">or</span>
              <div className="h-px flex-1 bg-white/10" />
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
