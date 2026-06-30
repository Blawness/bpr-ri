"use client";

import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Terjadi kesalahan yang tidak terduga.");
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 outline-none transition-all placeholder:text-neutral-400 text-navy-900";

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-navy-950/90 z-0"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
              Layanan Kontak
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Hubungi Kami
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Punya pertanyaan, masukan, atau perlu bantuan? Tim kami siap mendengarkan. Isi formulir
              di bawah atau hubungi kami melalui kontak yang tersedia.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">Informasi Kontak</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-50 p-3 rounded-2xl text-brand-600 border border-brand-100 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Alamat Kantor</h4>
                      <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                        Gedung Yayasan Purna Bakti (YARNATI) <br />
                        Lt. 4 Ruang 407&ndash;408 <br />
                        Jl. Proklamasi No. 44 <br />
                        Pegangsaan, Menteng <br />
                        Jakarta Pusat 10320
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-navy-50 p-3 rounded-2xl text-navy-700 border border-navy-100 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Telepon</h4>
                      <p className="text-sm text-neutral-600 mt-1">021-392-8018</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-3 rounded-2xl text-gold-600 border border-gold-100 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Email</h4>
                      <p className="text-sm text-neutral-600 mt-1">ketua@dpd-bprri-007.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-50 p-3 rounded-2xl text-brand-600 border border-brand-100 shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Jam Operasional</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        Senin - Jumat: 08.00 - 16.00 WIB <br />
                        Sabtu, Minggu &amp; Hari Libur: Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="hidden lg:block relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-900 to-navy-950 shadow-sm">
                <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-8">
                  <p className="text-white font-semibold text-lg mb-2">Transparan &amp; Akuntabel</p>
                  <p className="text-neutral-300 text-sm">
                    Kami senantiasa berupaya memberikan layanan informasi terbaik untuk masyarakat.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-neutral-100 relative overflow-hidden">
                {/* Status Overlays */}
                {status === "success" && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center transition-all duration-300">
                    <div className="w-20 h-20 bg-brand-50 border border-brand-100 rounded-full flex items-center justify-center mb-6 text-brand-600 animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">Pesan Terkirim!</h3>
                    <p className="text-neutral-600 mb-8 max-w-md">
                      Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan akan
                      segera kami tindaklanjuti.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-navy-900 rounded-xl font-medium transition-colors"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-neutral-700 ml-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-neutral-700 ml-1">
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-neutral-700 ml-1">
                      Subjek <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Pertanyaan seputar..."
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-neutral-700 ml-1">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan pesan Anda di sini secara detail..."
                      className={`${inputClass} resize-y`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-2xl shadow-lg shadow-brand-600/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <Send className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
