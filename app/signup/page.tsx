"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GithubIcon, GoogleIcon } from "../../components/Icons";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* =======================
   TYPES & SCHEMA
======================= */

type Provider = "google" | "github";

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

/* =======================
   PAGE
======================= */

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [pending, setPending] = useState<null | Provider | "signup">(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passMismatch = useMemo(() => {
    if (!password || !confirmPassword) return false;
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  async function signInSocial(provider: Provider) {
    try {
      setPending(provider);
      window.location.href = `/api/auth/${provider}`;
    } finally {
      setPending(null);
    }
  }

  async function onSubmit(data: SignUpValues) {
    setError(null);
    setPending("signup");

    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError(error.message || "An error occurred");
    } else {
      toast.success("Account created successfully");
      router.push("/email-verified");
    }

    setPending(null);
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-zinc-900 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-sky-400/50 via-blue-500/30 to-cyan-300/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-48 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/45 via-purple-500/30 to-pink-400/20 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-1/3 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-400/30 via-teal-400/20 to-cyan-300/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(0,0,0,0.25),rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/60" />
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <h1 className="text-lg font-semibold tracking-tight">
                Create account
              </h1>
            </div>

            {error && (
              <p className="mt-3 text-center text-xs text-red-300">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Field
                label="Full name"
                type="text"
                placeholder="Your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-[11px] text-red-300">
                  {errors.name.message}
                </p>
              )}

              <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[11px] text-red-300">
                  {errors.email.message}
                </p>
              )}

              {/* PASSWORD */}
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
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
                />
              </div>

              {/* CONFIRM */}
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
                  type={showPass2 ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
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

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => signInSocial("google")}
                disabled={pending !== null}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 disabled:opacity-50"
              >
                <GoogleIcon className="h-4 w-4 opacity-90" />
                {pending === "google" ? "Connecting…" : "Google"}
              </button>

              <button
                onClick={() => signInSocial("github")}
                disabled={pending !== null}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 disabled:opacity-50"
              >
                <GithubIcon className="h-4 w-4 opacity-90" />
                {pending === "github" ? "Connecting…" : "GitHub"}
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-white/55">
              Already have an account?{" "}
              <Link href="/login" className="text-white/80 hover:text-white">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =======================
   FIELD COMPONENT
======================= */

function Field({
  label,
  type,
  placeholder,
  ...props
}: {
  label: string;
  type: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/70">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
        {...props}
      />
    </div>
  );
}
