# Design Specification: Profil Ketua Section

## 1. Overview
Menambahkan bagian (section) baru di halaman `/profil` untuk menampilkan Profil Ketua BPR-RI.

## 2. Architecture & Placement
- **File to Modify**: `app/(public)/profil/page.tsx`
- **Placement**: Section "Profil Ketua" akan disisipkan tepat di bawah Hero Section dan tepat di atas section "Sejarah & Pembentukan".

## 3. UI/UX Design (Executive Split Layout)
Layout akan menggunakan model *split-screen* (kolom kiri dan kanan) pada layar besar (desktop/tablet), dan akan *stack* (tumpuk atas-bawah) pada layar *mobile*.

### Kolom Kiri (Visual)
- **Komponen**: Next.js `<Image>` untuk foto portrait ketua.
- **Styling**: Proporsi portrait (misalnya aspek rasio 3:4 atau 4:5), sudut melengkung (*rounded-xl/2xl*), dan *soft shadow* untuk memberikan kedalaman.
- *Placeholder*: Akan menggunakan *placeholder image* atau siluet elegan sementara jika foto asli belum tersedia.

### Kolom Kanan (Konten)
- **Eyebrow**: Label kecil berbunyi "Profil Pimpinan" (dengan gaya *uppercase*, latar belakang/border aksen sesuai desain eksisting).
- **Nama & Gelar**: Tipografi besar dan tebal (`text-3xl/4xl`) dengan warna teks gelap (misal `text-navy-900`).
- **Quote / Sambutan**: Menggunakan elemen `<blockquote>` dengan desain khusus (seperti garis tepi kiri tebal atau ikon kutipan besar), teks dicetak miring (*italic*).
- **Visi & Misi**: 
  - Ditampilkan tepat di bawah kutipan.
  - Visi dan Misi disajikan dalam sub-blok (*cards* sederhana atau *list*) agar informasi terstruktur dan mudah dibaca (tidak berupa paragraf raksasa).

## 4. Data Structure (Static)
Data profil ketua akan didefinisikan sebagai variabel konstan di dalam file tersebut (mengikuti pola data Sejarah, Dasar Hukum, dsb. yang sudah ada):
```typescript
const profilKetua = {
  nama: "[Nama Lengkap & Gelar]",
  foto: "/placeholder-ketua.jpg",
  quote: "[Sambutan singkat pimpinan...]",
  visi: "[Teks Visi...]",
  misi: [
    "[Misi 1...]",
    "[Misi 2...]",
    // ...
  ]
};
```

## 5. Scope & Dependencies
- **Dependencies**: Tidak ada dependensi baru (menggunakan React, Next Image, dan Tailwind CSS eksisting).
- **Scope**: Hanya fokus pada perubahan antarmuka (UI) di halaman `/profil`. Tidak ada integrasi backend/database untuk tahap ini.
