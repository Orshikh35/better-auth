import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // 'migrate' is not a valid property on PrismaConfig, so it's removed
});
