import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/server";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex gap-4">
      <Sidebar  />
      {children}
    </div>
  );
}
