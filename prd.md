# PRD: Website Organisasi Badan Pusat Reklasseering RI (BPR-RI)

**Version:** 1.0  
**Date:** 2026-06-29  
**Author:** Yudha Hafiz  
**Status:** Draft  

---

## 1. Overview

### 1.1 Product Summary
Website resmi Badan Pusat Reklasseering RI (BPR-RI) — lembaga yang bernaung di bawah Dewan Perwakilan Daerah Provinsi DKI Jakarta. Website ini berfungsi sebagai portal informasi publik yang menampilkan struktur organisasi interaktif, profil anggota, berita kegiatan, dan kanal kontak resmi. Target pengguna utama adalah masyarakat umum, mitra kelembagaan, dan anggota internal BPR-RI.

### 1.2 Goals
- Meningkatkan transparansi dan visibilitas publik BPR-RI secara digital
- Menyediakan informasi struktur organisasi yang mudah diakses dan interaktif
- Menjadi saluran komunikasi resmi antara BPR-RI dengan publik dan mitra
- Mendukung publikasi berita dan kegiatan organisasi secara mandiri via CMS

### 1.3 Non-Goals (Out of Scope for v1)
- Sistem login untuk anggota / member portal
- Fitur donasi atau pembayaran online
- Integrasi dengan sistem pemerintah (SIAK, e-Office, dll.)
- Mobile app (Android/iOS)
- Forum atau fitur komunitas interaktif

---

## 2. Users & Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `PublicVisitor` | Masyarakat umum yang mengakses website | Read-only: semua halaman publik |
| `Admin` | Pengelola konten internal BPR-RI | CRUD: berita, profil anggota, konten halaman |
| `SuperAdmin` | Developer / teknisi website | Full access termasuk manajemen admin dan konfigurasi |

---

## 3. Core Features (MVP)

### Feature 1: Halaman Struktur Organisasi Interaktif

**Description:**  
Menampilkan bagan organisasi BPR-RI dalam bentuk tree interaktif. Setiap node berisi nama pejabat dan jabatan. User dapat hover/klik pada node untuk melihat detail singkat. Bagan dirender dari data yang tersimpan di database, bukan hardcoded.

**Struktur Organisasi (sesuai dokumen):**
- Penasehat 1 & 2 (H. Mukawa Ali, Muhammad Hatta)
- Pembina (Fenella Putri Nataningrat)
- Kepala (Harun Prayitno, S.E., S.H., M.H)
- Wakil Kepala (Adam Maulana Hafiz, S.H.)
- Sekretariat Badan (Annisa Novianty, S.H., M.H.)
- Seksi Keuangan & Subsidi
- 12 Seksi lainnya (nomor 5–16 sesuai dokumen)

**Acceptance Criteria:**
- [ ] Bagan org tampil benar sesuai hierarki dokumen resmi
- [ ] Setiap node klikable dan menampilkan nama lengkap + jabatan + gelar
- [ ] Responsive: tampil baik di desktop dan mobile (scroll horizontal jika perlu)
- [ ] Data bagan diambil dari API (`GET /api/members?view=org-chart`)
- [ ] Animasi expand/collapse pada node child
- [ ] Tombol export bagan sebagai PNG (opsional, nice-to-have)

**Out of Scope:**  
Edit bagan langsung dari frontend (drag-and-drop repositioning). Penambahan level organisasi lebih dari yang ada saat ini.

---

### Feature 2: Profil Anggota

**Description:**  
Halaman daftar anggota BPR-RI beserta detail profil masing-masing. Setiap anggota memiliki halaman profil individual dengan foto, nama lengkap, jabatan, dan deskripsi singkat. Admin dapat menambah, mengedit, atau menonaktifkan profil anggota via dashboard.

**Acceptance Criteria:**
- [ ] Halaman `/anggota` menampilkan grid/list semua anggota aktif
- [ ] Setiap kartu anggota menampilkan foto, nama, dan jabatan
- [ ] Halaman detail `/anggota/[slug]` menampilkan profil lengkap
- [ ] Foto anggota dapat diupload oleh Admin (maks. 2MB, format JPG/PNG/WebP)
- [ ] Jika foto tidak diupload, tampilkan avatar placeholder dengan inisial nama
- [ ] Filter anggota berdasarkan seksi/divisi
- [ ] Admin dapat CRUD profil anggota via `/admin/anggota`

**Out of Scope:**  
Login anggota untuk edit profil sendiri. Fitur pesan antar anggota.

---

### Feature 3: Berita & Artikel

**Description:**  
Modul publikasi konten berupa berita kegiatan, pengumuman, dan artikel organisasi. Admin menulis dan mempublikasikan artikel via rich text editor. Pengunjung dapat membaca artikel yang sudah dipublikasi, diurutkan dari terbaru.

**Acceptance Criteria:**
- [ ] Halaman `/berita` menampilkan daftar artikel dengan pagination (10 per halaman)
- [ ] Setiap artikel memiliki: judul, thumbnail, ringkasan, konten lengkap, tanggal, penulis
- [ ] Halaman detail `/berita/[slug]` merender konten rich text dengan benar
- [ ] Admin dapat membuat/edit/hapus/draft artikel via `/admin/berita`
- [ ] Rich text editor mendukung: heading, bold/italic, list, gambar inline, link
- [ ] Artikel dapat dikategorikan (Pengumuman, Kegiatan, Lainnya)
- [ ] SEO meta tags otomatis dari judul dan ringkasan artikel

**Out of Scope:**  
Sistem komentar publik. Langganan newsletter. Multi-author workflow dengan review/approval.

---

### Feature 4: Halaman Kontak & Formulir

**Description:**  
Halaman kontak berisi informasi resmi BPR-RI (alamat, email, nomor telepon) dan formulir pengiriman pesan. Pesan yang masuk dikirimkan via email ke alamat admin yang dikonfigurasi. Tidak ada sistem tiket atau tracking pesan.

**Acceptance Criteria:**
- [ ] Halaman `/kontak` menampilkan info kontak lengkap organisasi
- [ ] Formulir memiliki field: Nama, Email, Subjek, Pesan
- [ ] Validasi form di sisi client (required, format email)
- [ ] Submit form mengirim email notifikasi ke alamat admin via Resend
- [ ] Tampilkan pesan sukses/gagal setelah submit
- [ ] Integrasi Google Maps embed untuk lokasi kantor
- [ ] Rate limiting sederhana: maks. 3 submit per IP per jam

**Out of Scope:**  
Sistem tiket / tracking pesan. Chatbot. Live chat.

---

### Feature 5: Admin Dashboard (CMS via @blawness/admin-kit@0.8.0)

**Description:**  
Panel administrasi menggunakan `@blawness/admin-kit@0.8.0`. Package ini bundle auth (NextAuth v5), editor (Tiptap), ORM (Drizzle), media upload (R2), dan UI secara penuh. Consumer hanya perlu wiring config minimal.

**Peer deps yang harus disediakan consumer:**
- `next ^16.2.0`, `react ^19.2.0`, `react-dom ^19.2.0`, `tailwindcss ^4`

**Acceptance Criteria:**
- [ ] Package terinstall: `pnpm add github:Blawness/admin-kit#v0.8.0`
- [ ] `package.json` memiliki `pnpm.onlyBuiltDependencies: ["@blawness/admin-kit", "esbuild", "sharp"]`
- [ ] `next.config.ts`: `transpilePackages: ["@blawness/admin-kit"]` + `images.remotePatterns` untuk host R2
- [ ] `globals.css`: `@source` ke node_modules admin-kit + `@theme` token `navy`, `brand`, `gold`
- [ ] `middleware.ts` disetup untuk register RBAC kit v0.8
- [ ] `instrumentation.ts` disetup untuk register kit v0.8
- [ ] Route handler `app/api/auth/[...nextauth]/route.ts` dikonfigurasi
- [ ] Admin dapat CRUD artikel dengan rich text editor (Tiptap) bawaan kit
- [ ] Upload media ke Cloudflare R2 via env `R2_*`
- [ ] Halaman publik `/berita` menggunakan `getPublishedArticles()` dari `@blawness/admin-kit/public`
- [ ] Halaman `/berita/[slug]` menggunakan `getPublishedArticleBySlug()` + `generateStaticParams` via `getPublishedArticleSlugs()`
- [ ] Sitemap: `getSitemapEntries()` di `app/sitemap.ts`
- [ ] RSS: `generateRssXml()` di `app/rss.xml/route.ts`
- [ ] Drizzle migration: `pnpm db:migrate` setelah schema update

**Out of Scope:**  
Modifikasi internal admin-kit. Fitur di luar yang disediakan kit.

---

## 4. Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Runtime** | Node.js ≥ 20.9 | Syarat Next 16; CI pakai Node 22 |
| **Framework** | Next.js 16.2+ (App Router) | Peer dep wajib admin-kit |
| **Language** | TypeScript 5 | strict mode |
| **Database** | PostgreSQL (Neon / Railway) | Pooled connection; `prepare: false` jika pakai Neon/pgBouncer transaction mode |
| **ORM** | drizzle-orm (bundled) + drizzle-kit (devDep) | drizzle-kit di-install manual untuk `db:generate` / `db:migrate` / `push` |
| **CMS Package** | @blawness/admin-kit@0.8.0 | `github:Blawness/admin-kit#v0.8.0` — bundle auth, editor, UI, media, ORM |
| **Auth** | next-auth v5 beta (bundled via kit) | `AUTH_SECRET` env wajib; route handler `app/api/auth/[...nextauth]/route.ts` |
| **Styling** | Tailwind CSS v4 (peer dep) | `globals.css`: `@source` ke package + `@theme` token `navy`, `brand`, `gold` |
| **Rich Text Editor** | @tiptap/* (bundled via kit) | starter-kit, image, link, react, pm |
| **Org Chart** | React Flow atau d3-org-chart | Custom, di luar kit |
| **State Management** | TanStack Query | Data fetching halaman publik non-kit |
| **API Style** | REST (Next.js Route Handlers) | Hanya untuk fitur custom: anggota, kontak |
| **File Storage** | Cloudflare R2 (bundled via kit) | Opsional; env `R2_*` wajib jika pakai fitur upload |
| **Email** | Resend | Form kontak; di luar kit |
| **Deployment** | Vercel | |
| **Package Manager** | pnpm | `pnpm.onlyBuiltDependencies`: `["@blawness/admin-kit", "esbuild", "sharp"]` |

---

## 5. Data Models

```typescript
// Member — custom model (consumer), di luar admin-kit schema
// Definisikan di drizzle schema consumer

export const members = pgTable("members", {
  id:        uuid("id").primaryKey().defaultRandom(),
  name:      text("name").notNull(),             // Nama lengkap + gelar
  slug:      text("slug").notNull().unique(),
  position:  text("position").notNull(),         // Jabatan
  division:  text("division").notNull(),         // Seksi/divisi
  level:     integer("level").notNull(),         // 1=Penasehat, 2=Pembina, 3=Kepala, dst.
  parentId:  uuid("parent_id").references(() => members.id), // FK self-ref (org chart tree)
  photoUrl:  text("photo_url"),
  bio:       text("bio"),
  isActive:  boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ContactMessage — custom model (consumer)
export const contactMessages = pgTable("contact_messages", {
  id:          uuid("id").primaryKey().defaultRandom(),
  senderName:  text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  subject:     text("subject").notNull(),
  message:     text("message").notNull(),
  createdAt:   timestamp("created_at").defaultNow(),
});

// Article, User, Session, dll → schema disediakan @blawness/admin-kit
// Akses read-only via: import { getPublishedArticles, ... } from "@blawness/admin-kit/public"
```

---

## 6. API Endpoints

> Endpoint untuk **artikel dan auth** sepenuhnya di-handle oleh `@blawness/admin-kit`. Berikut hanya endpoint custom yang perlu dibuat di consumer.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/members` | public | List semua anggota aktif. Query: `?view=org-chart` untuk format tree |
| `GET` | `/api/members/[slug]` | public | Detail profil anggota |
| `POST` | `/api/members` | Admin (kit session) | Tambah anggota baru |
| `PUT` | `/api/members/[id]` | Admin (kit session) | Update profil anggota |
| `DELETE` | `/api/members/[id]` | Admin (kit session) | Soft delete anggota |
| `POST` | `/api/contact` | public | Submit form kontak (rate limited) |

---

## 7. Project Structure

```
bpr-ri-website/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── struktur-organisasi/page.tsx
│   │   ├── anggota/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── berita/
│   │   │   ├── page.tsx              # getPublishedArticles() — admin-kit/public
│   │   │   └── [slug]/page.tsx       # getPublishedArticleBySlug() + generateStaticParams
│   │   └── kontak/page.tsx
│   ├── admin/                        # Mount point @blawness/admin-kit
│   │   └── [[...kit]]/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts  # WAJIB: NextAuth v5 route handler
│   │   ├── members/route.ts
│   │   ├── members/[id]/route.ts
│   │   └── contact/route.ts
│   ├── sitemap.ts                    # getSitemapEntries() — admin-kit/public
│   └── rss.xml/route.ts              # generateRssXml() — admin-kit/public
├── components/
│   ├── ui/
│   ├── org-chart/
│   │   ├── OrgChart.tsx
│   │   └── OrgNode.tsx
│   ├── member/
│   │   ├── MemberCard.tsx
│   │   └── MemberGrid.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── db.ts                         # Drizzle client (DATABASE_URL, prepare: false)
│   ├── resend.ts
│   └── utils.ts
├── db/
│   └── schema.ts                     # Drizzle schema consumer (Member, ContactMessage)
├── types/index.ts
├── middleware.ts                     # WAJIB: register RBAC admin-kit v0.8
├── instrumentation.ts                # WAJIB: register admin-kit v0.8
├── globals.css                       # @source admin-kit + @theme navy/brand/gold
├── next.config.ts                    # transpilePackages + images.remotePatterns R2
└── package.json                      # pnpm.onlyBuiltDependencies
```

---

## 8. Environment Variables

```env
# Database — pooled connection (Neon/pgBouncer: tambahkan ?pgbouncer=true)
DATABASE_URL=postgresql://...

# Auth (NextAuth v5)
AUTH_SECRET=   # openssl rand -base64 32

# Cloudflare R2 — opsional, wajib jika pakai fitur upload/media
R2_BUCKET=
R2_PUBLIC_URL=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=

# Email (Resend) — form kontak custom
RESEND_API_KEY=
CONTACT_EMAIL_TO=admin@bprri.or.id

# Site config
NEXT_PUBLIC_SITE_URL=https://bprri.or.id
```

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Org chart load time | < 2 detik | Lighthouse / manual |
| Form kontak berhasil terkirim | 100% (non-spam) | Manual QA |
| Admin dapat publish artikel | < 5 menit end-to-end | Manual QA |
| Semua halaman publik lulus SEO basic | Score > 90 | Lighthouse SEO |
| Mobile responsive | Tidak ada horizontal overflow | BrowserStack / DevTools |

---

## 10. Open Questions

- [ ] Apakah domain sudah tersedia? (bprri.or.id atau alternatif)
- [ ] Siapa yang akan jadi Admin pertama? Perlu seed data admin di awal
- [ ] Foto anggota tersedia atau perlu placeholder semua dulu?
- [ ] Apakah konten homepage (hero, tentang kami, visi misi) sudah ada teksnya?
- [ ] Apakah perlu halaman "Tentang Kami" terpisah selain struktur organisasi?
- [ ] Logo dan aset branding BPR-RI (format SVG/PNG) tersedia?

---

*Generated by prd-generator skill — optimized for AI agentic coding tools (Claude Code, Cursor, Codex).*
