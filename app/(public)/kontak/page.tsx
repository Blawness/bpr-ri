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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Punya pertanyaan, masukan, atau perlu bantuan? Tim kami siap mendengarkan dan membantu Anda. Silakan isi formulir di bawah ini atau hubungi kami melalui kontak yang tersedia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Alamat Kantor</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      Gedung Yayasan Purna Bakti (YARNATI) <br />
                      Lt. 4 Ruang 407&ndash;408 <br />
                      Jl. Proklamasi No. 44 <br />
                      Pegangsaan, Menteng <br />
                      Jakarta Pusat 10320
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Telepon</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      (021) 2554 9000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl text-purple-600 dark:text-purple-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      humas@bprri.or.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Jam Operasional</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Senin - Jumat: 08.00 - 16.00 WIB <br />
                      Sabtu, Minggu & Hari Libur: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="hidden lg:block relative h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
               <div className="absolute inset-0 flex flex-col justify-center p-8">
                 <p className="text-white font-medium text-lg mb-2">Transparan & Akuntabel</p>
                 <p className="text-blue-100 text-sm opacity-90">Kami senantiasa berupaya memberikan layanan informasi terbaik untuk masyarakat.</p>
               </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 relative overflow-hidden">
              
              {/* Status Overlays */}
              {status === "success" && (
                <div className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center transition-all duration-300">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pesan Terkirim!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan akan segera kami tindaklanjuti.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {status === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl flex items-start gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
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
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
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
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
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
                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
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
                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
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
    </div>
  );
}
