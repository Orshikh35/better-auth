"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GithubIcon, GoogleIcon } from "../../components/Icons";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Provider = "google" | "github";

const signInSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [pending, setPending] = useState<null | Provider | "email">(null);

  const [error, setError] = useState<string | null>(null)

  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function  onSubmit ({email, password, rememberMe}: SignInValues)  {
    setError(null);
    setPending("email");

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    if (error) {
      setError(error.message || "An error occurred");
    } else {
      toast.success("Signed in successfully");
      router.push("/dashboard");
    }
  };


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
                  {...form.register("email")}
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
                  {...form.register("password")}
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
                onClick={form.handleSubmit(onSubmit, (errors) => {
                  setError(errors.email?.message || errors.password?.message || "An error occurred");
                })}
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
