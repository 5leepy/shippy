# 📦 ShippyLabel - Aplikasi Cetak Label Pengiriman

> Aplikasi web modern untuk mencetak label pengiriman dengan cepat, praktis, dan profesional.

![Tangkapan Layar Aplikasi](https://5leepy-img.netlify.app/shippylabelimgs/shippylabel.png) 

**ShippyLabel** adalah aplikasi web yang dirancang untuk memudahkan penjual online, UMKM, atau siapa pun dalam membuat label pengiriman yang siap cetak. Dibangun menggunakan **Vite + React**, aplikasi ini menyediakan antarmuka modern dengan fitur lengkap untuk efisiensi maksimal.

---

## ✨ Fitur Utama

* **Formulir Ringkas:** Layout dua kolom yang ringkas dan responsif untuk pengisian cepat.
* **Alamat Dinamis:** Dropdown bertingkat (Provinsi → Kota/Kabupaten → Kecamatan → Kelurahan/Desa) dengan data dari API Wilayah Indonesia.
* **Pratinjau Real-time:** Perubahan label dapat langsung dilihat saat mengisi formulir.
* **Pilihan Ukuran Kertas:** Dukungan untuk kertas thermal umum (100mm, 80mm, 58mm) dengan penyesuaian layout otomatis.
* **Unduh PDF Langsung:** Menghasilkan file PDF berkualitas tinggi tanpa dialog cetak browser.
* **Deteksi Kurir Otomatis:** Identifikasi kurir (JNE, J\&T, SiCepat, dll.) berdasarkan nomor resi (AWB).
* **Barcode Otomatis:** Barcode dihasilkan otomatis saat nomor resi dimasukkan.
* **Validasi Input:** Validasi nomor telepon +62 dan format input lain untuk mencegah kesalahan.

---

## 🛠️ Teknologi yang Digunakan

* **[Vite](https://vitejs.dev/):** Build tool super cepat untuk pengembangan modern.
* **[React](https://reactjs.org/):** Library UI berbasis komponen.
* **CSS Modules:** Styling komponen yang scoped dan modular.
* **[jsPDF](https://github.com/parallax/jsPDF):** Untuk menghasilkan file PDF di sisi klien.
* **[html2canvas](https://github.com/niklasvh/html2canvas):** Untuk menangkap tampilan DOM sebagai gambar.
* **[react-barcode](https://github.com/kciter/react-barcode):** Komponen barcode berbasis SVG.

---

## 🚀 Memulai Proyek

### Prasyarat

* Node.js dan npm (atau yarn/pnpm) telah terpasang di komputer Anda.

### Instalasi

```bash
git clone https://github.com/username-anda/shippylabel.git
cd shippylabel
npm install
```

### Menjalankan Aplikasi

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

---

## 📄 Cara Penggunaan

1. Isi informasi **Pengirim** dan **Penerima** pada formulir.
2. Pilih **Provinsi**, kemudian lanjutkan ke **Kota/Kabupaten**, **Kecamatan**, hingga **Kelurahan/Desa**.
3. *(Opsional)* Masukkan **Nomor Resi (AWB)**. Jika dikenali, logo kurir dan barcode akan muncul otomatis.
4. Pilih **Ukuran Kertas Cetak** sesuai printer thermal Anda.
5. Klik tombol **"Download PDF"** untuk mengunduh label siap cetak.

---

## 🙏 Apresiasi

* Data wilayah Indonesia disediakan oleh [API Wilayah Indonesia oleh Emsifa](https://emsifa.github.io/api-wilayah-indonesia/).
* Terima kasih kepada semua pengembang pustaka open-source yang digunakan dalam proyek ini.

---

## 📝 Lisensi

Proyek ini dirilis dengan lisensi **MIT**. Silakan gunakan dan modifikasi sesuai kebutuhan Anda.

---

## 💡 Catatan Tambahan

Jika Anda menemukan bug atau ingin berkontribusi, silakan buat [issue](https://github.com/5leepy/shippylabel/issues) atau [pull request](https://github.com/5leepy/shippylabel/pulls). Terima kasih atas partisipasinya!
