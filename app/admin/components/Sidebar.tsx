"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Module = {
  id: string;
  name_mn: string;
  name_en: string;
  url: string;
};

type Lang = "mn" | "en";

export default function SimpleSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [modules, setModules] = useState<Module[]>([]);
  console.log(modules, "asdasdasdasd");
  const [lang, setLang] = useState<Lang>("mn");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch("/api/modules", { credentials: "include" });

        if (res.status === 401) {
          router.replace("/login");
          return;
        }

        if (!res.ok) {
          console.error("Modules error:", await res.text());
          return;
        }

        const data = (await res.json()) as Module[];
        if (mounted) setModules(data);
      } catch (e) {
        console.error("Sidebar load error:", e);
      } finally {
        mounted && setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [router]);

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/");

  return (
    <aside className="w-72 h-screen bg-slate-900 text-white border-r border-white/10 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">Menu</div>

        {/* Lang toggle */}
        <button
          type="button"
          onClick={() => setLang((p) => (p === "mn" ? "en" : "mn"))}
          className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15"
        >
          {lang.toUpperCase()}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-white/60 text-sm">Loading...</div>
      ) : modules.length === 0 ? (
        <div className="text-white/60 text-sm">No modules</div>
      ) : (
        <nav className="flex flex-col gap-1">
          {modules.map((m) => (
            <Link
              key={m.id}
              href={m.url}
              className={[
                "px-3 py-2 rounded-lg text-sm transition",
                isActive(m.url)
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {lang === "mn" ? m.name_mn : m.name_en}
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
}
