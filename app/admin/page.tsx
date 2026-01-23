import { getServerSession } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  // Нэвтрээгүй бол login руу
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  console.log("User session:", user);

  return (
    <main className="p-48">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="rounded-lg border p-4 space-y-2">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name ?? "—"}</p>
        <p>
          <strong>Email verified:</strong>{" "}
          {user.emailVerified ? "✅ Verified" : "❌ Not verified"}
        </p>

        {/* Хэрвээ role байгаа бол */}
        {"role" in user && (
          <p><strong>Role:</strong> {(user as any).role}</p>
        )}
      </div>
    </main>
  );
}
