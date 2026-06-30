import "dotenv/config";
import { db } from "./lib/db";
import { members } from "./db/schema";
import crypto from "crypto";

async function main() {
  console.log("Seeding members...");

  // Generate IDs
  const idPenasehat1 = crypto.randomUUID();
  const idPenasehat2 = crypto.randomUUID();
  const idPembina = crypto.randomUUID();
  const idKepala = crypto.randomUUID();
  const idWakilKepala = crypto.randomUUID();
  const idSekretariat = crypto.randomUUID();
  const idKeuangan = crypto.randomUUID();

  const data = [
    {
      id: idPenasehat1,
      name: "H. MUKAWA ALI",
      slug: "h-mukawa-ali",
      position: "Penasehat 1",
      division: "Dewan Penasehat",
      level: 1,
      parentId: null,
      sortOrder: 1,
    },
    {
      id: idPenasehat2,
      name: "MUHAMMAD HATTA",
      slug: "muhammad-hatta",
      position: "Penasehat 2",
      division: "Dewan Penasehat",
      level: 1,
      parentId: null,
      sortOrder: 2,
    },
    {
      id: idPembina,
      name: "FENELLA PUTRI NATANINGRAT",
      slug: "fenella-putri-nataningrat",
      position: "Pembina",
      division: "Dewan Pembina",
      level: 2,
      parentId: null,
      sortOrder: 3,
    },
    {
      id: idKepala,
      name: "HARUN PRAYITNO, S.E., S.H., M.H",
      slug: "harun-prayitno",
      position: "Kepala",
      division: "Pimpinan Pusat",
      level: 3,
      parentId: idPembina,
      sortOrder: 4,
    },
    {
      id: idWakilKepala,
      name: "ADAM MAULANA HAFIZ, S.H.",
      slug: "adam-maulana-hafiz",
      position: "Wakil Kepala",
      division: "Pimpinan Pusat",
      level: 4,
      parentId: idKepala,
      sortOrder: 5,
    },
    {
      id: idSekretariat,
      name: "ANNISA NOVIANTY, S.H., M.H.",
      slug: "annisa-novianty",
      position: "Sekretariat Badan",
      division: "Sekretariat",
      level: 5,
      parentId: idWakilKepala,
      sortOrder: 6,
    },
    {
      id: idKeuangan,
      name: "CAHYA PUSPITA RINI, S.E.",
      slug: "cahya-puspita-rini",
      position: "Seksi Keuangan & Subsidi",
      division: "Keuangan",
      level: 5,
      parentId: idWakilKepala,
      sortOrder: 7,
    },
    ...[
      { pos: "Seksi Humas & Perundang-undangan", name: "RUSWONDO, S.H.", slug: "ruswondo" },
      { pos: "Seksi Ortala (Organisasi & Tata Laksana)", name: "YUDHA HAFIZ, S.BNS.", slug: "yudha-hafiz" },
      { pos: "Seksi Litbang & Pembinaan", name: "WISRIANTO, S.T.", slug: "wisrianto" },
      { pos: "Seksi Pembinaan Narapidana & Ex-Narapidana", name: "MULKAN LESSY TUSSEN", slug: "mulkan-lessy-tussen" },
      { pos: "Seksi Pengawasan Narapidana & Ex-Narapidana", name: "AHMADA ALIFTANO NUGROHO, S.H.", slug: "ahmada-aliftano-nugroho" },
      { pos: "Seksi Perbaikan Akhlak Narapidana", name: "M. IHSAN NAUFAL", slug: "m-ihsan-naufal" },
      { pos: "Seksi Pembebasan Terpidana", name: "YUSRIZAL, S.H., M.H", slug: "yusrizal" },
      { pos: "Seksi Hubungan Kelembagaan", name: "YANDI NURARIFIANDI, S.SOS.", slug: "yandi-nurarifiandi" },
      { pos: "Seksi Pendidikan & Pelatihan", name: "M. NAWAWI RAHMAT NUBUAT", slug: "m-nawawi-rahmat-nubuat" },
      { pos: "Seksi Perlindungan Perempuan & Anak", name: "VELIA DWI YULIANTI, S.E.", slug: "velia-dwi-yulianti" },
      { pos: "Seksi Pengawasan Kantor & Lingkungan", name: "FIRDAUS AGLIS AKBAR, S.H.", slug: "firdaus-aglis-akbar" },
      { pos: "Seksi Usaha-usaha Keluar", name: "M. FAIZAL AMRI, S.H.I.", slug: "m-faizal-amri" },
      { pos: "Seksi Usaha-usaha Keluar", name: "ARDI ERFINDO WAEL", slug: "ardi-erfindo-wael" },
      { pos: "Seksi Usaha-usaha Keluar", name: "NAJIB PAYUDIN", slug: "najib-payudin" },
      { pos: "Seksi Usaha-usaha Keluar", name: "AHMAD AJI SUSILO", slug: "ahmad-aji-susilo" },
      { pos: "Seksi Usaha-usaha Keluar", name: "NURUL HUDA", slug: "nurul-huda" },
    ].map((item, idx) => ({
      id: crypto.randomUUID(),
      name: item.name,
      slug: item.slug,
      position: item.pos,
      division: "Seksi-seksi",
      level: 6,
      parentId: idWakilKepala,
      sortOrder: 8 + idx,
    }))
  ];

  for (const row of data) {
    await db
      .insert(members)
      .values(row)
      .onConflictDoUpdate({
        target: members.slug,
        set: {
          name: row.name,
          position: row.position,
          division: row.division,
          level: row.level,
          parentId: row.parentId,
          sortOrder: row.sortOrder,
          updatedAt: new Date(),
        },
      });
  }

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch(console.error);
