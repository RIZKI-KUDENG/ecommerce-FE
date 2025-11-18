# Exclusive - Fashion E-commerce Frontend

![Exclusive Logo](public/logo.jpg)

**Exclusive** adalah aplikasi web e-commerce modern yang dibangun menggunakan **Next.js 16**, **TypeScript**, dan **Tailwind CSS v4**. Project ini menyediakan antarmuka pengguna yang responsif untuk browsing produk, manajemen kategori, serta dashboard admin untuk pengelolaan inventaris (produk, varian, dan stok).

## 🚀 Fitur Utama

### 👤 Pengguna (Client)
* **Autentikasi & Otorisasi:** Registrasi dan Login menggunakan JWT (JSON Web Token).
* **Pencarian Produk:** Fitur pencarian *real-time* dengan *debounce* untuk performa yang optimal.
* **Kategori Produk:** Browsing produk berdasarkan kategori (Smartphone, Laptop, Smartwatch).
* **Detail Produk:** Halaman detail untuk melihat deskripsi dan spesifikasi produk.
* **Carousel Banner:** Tampilan banner promosi interaktif di halaman utama.
* **Navigasi Responsif:** Sidebar dan Navbar yang menyesuaikan dengan tampilan mobile dan desktop.

### 🛠 Dashboard (Admin)
* **Manajemen Produk:** Formulir untuk menambahkan produk baru dengan validasi data.
* **Manajemen Varian:** Menambahkan varian spesifik untuk produk tertentu.
* **Manajemen Stok:** Update stok produk berdasarkan varian dan warna.
* **Layout Terpisah:** Struktur layout khusus untuk area dashboard dengan sidebar navigasi.

## 🛠️ Teknologi yang Digunakan

Project ini dibangun di atas tumpukan teknologi modern (Tech Stack):

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Library UI:** [React 19](https://react.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Komponen UI:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI based)
* **Validasi Form:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

* **Node.js** (Versi 18.17 atau lebih baru direkomendasikan untuk Next.js 16)
* **npm**, **yarn**, atau **pnpm** sebagai package manager.
* Backend API yang berjalan (Project ini dikonfigurasi untuk memanggil API, defaultnya mungkin `http://localhost:3001` atau sesuai environment variable).

## 📦 Instalasi & Menjalankan Project

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username-anda/ecommerce-fe.git](https://github.com/username-anda/ecommerce-fe.git)
    cd ecommerce-fe
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variable:**
    Buat file `.env.local` di root project dan tambahkan URL API backend Anda:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001 # Ganti dengan URL backend Anda
    ```

4.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

5.  **Buka browser:**
    Akses `http://localhost:3000` untuk melihat aplikasi.

## 📖 Contoh Penggunaan

### Mengakses Halaman Utama
Buka root URL (`/`). Anda akan melihat slider banner dan daftar kategori produk. Klik pada kategori atau produk rekomendasi untuk melihat detail.

### Login / Register
1. Klik tombol **Sign Up** di navbar untuk membuat akun baru.
2. Jika sudah punya akun, klik **Sign In**.
3. Setelah login, token akan disimpan di `localStorage` dan header navbar akan berubah menampilkan profil user.

### Mengakses Dashboard Admin
Untuk menambahkan produk (pastikan Anda memiliki hak akses atau backend mengizinkannya):
1. Navigasi ke `/dashboard`.
2. Gunakan sidebar untuk berpindah antara **Add Product**, **Add Variant**, atau **Add Stock**.
3. Isi formulir yang tersedia (validasi form akan aktif menggunakan Zod).

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin berkontribusi pada project ini:

1.  **Fork** repository ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  **Push** ke branch tersebut (`git push origin fitur-keren`).
5.  Buat **Pull Request** baru.

## 📄 Lisensi

Project ini dilisensikan di bawah lisensi **MIT**. Lihat file [LICENSE](LICENSE) untuk detail selengkapnya.

---

**Catatan:** Pastikan backend API sudah berjalan agar fitur seperti Login, Register, dan Fetch Products dapat berfungsi dengan baik.