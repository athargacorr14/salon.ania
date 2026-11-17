SALON ANIA — WEBSITE (3 HALAMAN)

Isi folder:
- index.html      : Beranda (hero, tentang, layanan, alur, tim, galeri, testimoni, kontak, peta, FAQ)
- tim.html        : Halaman Pencukur/Stylist + Galeri hasil cukur (filter + lightbox)
- testimoni.html  : Halaman Testimoni (filter + form kirim testimoni via WhatsApp)
- style.css       : desain, responsive (desktop, tablet, HP), animasi
- script.js       : loading screen, menu, filter, lightbox, slider, tombol WhatsApp/Instagram
- assets/         : logo

WAJIB DIUBAH — buka script.js, bagian CONFIG di paling atas:
  whatsapp  : nomor WhatsApp salon (format 62812xxxxxxx, tanpa + / 0 depan). Saat ini masih CONTOH.
  instagram : username Instagram salon tanpa @. Saat ini masih CONTOH ("salonania").
Semua tombol WhatsApp, Instagram, dan telepon di ketiga halaman otomatis mengikuti nilai ini.

Yang perlu diganti dengan data asli:
- Foto, nama, dan keahlian pencukur (tim.html / index.html) -> saat ini foto & nama CONTOH (Unsplash).
- Foto galeri -> saat ini foto contoh dari Unsplash. Ganti dengan hasil kerja asli salon.
- Testimoni -> contoh. Ganti dengan ulasan pelanggan asli.
- Daftar layanan, alamat, nomor telepon -> verifikasi sebelum publikasi.

Catatan teknis:
- Ikon memakai Iconify (CDN), font memakai Google Fonts, foto dari Unsplash -> butuh internet.
- Loading screen hanya tampil penuh di kunjungan pertama per sesi.
- Website statis HTML/CSS/JS, bisa langsung di-deploy (Vercel/Netlify) atau dijalankan dengan Live Server.
