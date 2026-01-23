export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // role name (ADMIN гэх мэт)
  const roleName = session.user.role;
  console.log(roleName, "roleName");
  if (!roleName) return NextResponse.json([]);

  // 1️⃣ role-д хамаарах бүх module
  const modules = await prisma.modules.findMany({
    where: {
      role_modules: {
        some: {
          roles: {
            name: roleName,
          },
        },
      },
    },
    orderBy: { order_no: "asc" },
  });
  console.log(modules, "modules");
  // 2️⃣ Tree болгож хувиргана
  const map = new Map<string, any>();
  const roots: any[] = [];

  modules.forEach((m: { id: string; }) => {
    map.set(m.id, { ...m, children: [] });
  });

  modules.forEach((m: { parent_id: string; id: string; }) => {
    if (m.parent_id) {
      const parent = map.get(m.parent_id);
      if (parent) {
        parent.children.push(map.get(m.id));
      }
    } else {
      roots.push(map.get(m.id));
    }
  });

  return NextResponse.json(roots);
}
