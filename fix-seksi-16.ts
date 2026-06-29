import "dotenv/config";
import { db } from "./lib/db";
import { members } from "./db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

async function main() {
  console.log("Fixing Seksi 16...");

  // Get the parentId for Seksi 16 (Wakil Kepala)
  const wakilKepala = await db.query.members.findFirst({
    where: eq(members.slug, "adam-maulana-hafiz"),
  });

  if (!wakilKepala) throw new Error("Wakil Kepala not found");

  // Delete the old placeholder entry
  await db.delete(members).where(eq(members.slug, "m-faizal-amri"));

  const names = [
    { name: "M. FAIZAL AMRI, S.HI.", slug: "m-faizal-amri-shi" },
    { name: "ARDI ERFINDO WAEL", slug: "ardi-erfindo-wael" },
    { name: "NAJIB PAYUDIN", slug: "najib-payudin" },
    { name: "AHMAD AJI SUSILO", slug: "ahmad-aji-susilo" },
    { name: "NURUL HUDA", slug: "nurul-huda" },
  ];

  for (let i = 0; i < names.length; i++) {
    await db.insert(members).values({
      id: crypto.randomUUID(),
      name: names[i].name,
      slug: names[i].slug,
      position: "Seksi Usaha-usaha Keluar",
      division: "Seksi-seksi",
      level: 6,
      parentId: wakilKepala.id,
      sortOrder: 19 + i,
    }).onConflictDoNothing();
  }

  console.log("Fixed Seksi 16 successfully!");
  process.exit(0);
}

main().catch(console.error);
