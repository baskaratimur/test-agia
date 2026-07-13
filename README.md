# Ramoo.id - Automation Testing Framework

Framework otomasi untuk menguji sistem Point of Sales (POS) dan Landing Page pada **Ramoo.id**. Framework ini dibangun menggunakan **Playwright** dan bahasa **TypeScript**, dengan menerapkan arsitektur *Page Object Model* (POM) yang rapi, *Atomic Testing*, dan pengelolaan *Session Authentication* (Storage State).

---

## 🛠 Prerequisites

Pastikan Anda sudah menginstal aplikasi berikut di komputer Anda:
1. [Node.js](https://nodejs.org/en/) (Versi LTS terbaru sangat disarankan)
2. Terminal / Command Line (seperti Git Bash, PowerShell, atau VS Code Terminal)

---

## ⚙️ Installation & Setup

1. Buka folder/project ini di dalam terminal atau VS Code Anda.
2. Lakukan instalasi seluruh pustaka (*dependencies*) Node.js yang dibutuhkan:
   ```bash
   npm install
   ```
3. Unduh dan pastikan *browser engine* bawaan Playwright terpasang dengan menjalankan:
   ```bash
   npx playwright install
   ```
4. Buat file `.env` di direktori utama (*root*) dari project ini. Anda dapat menyalin isinya dari kebutuhan sistem Anda:
   ```env
   BASE_URL=https://www.ramoo.id
   POS_USER=xxxx
   POS_PASS=xxxx
   ```
   *(File `.env` tidak akan ter-commit ke Git karena sudah masuk di pengecualian `.gitignore`)*

---

## 🚀 Cara Menjalankan Automation

Framework ini telah dikonfigurasi untuk menangani proses **Login Otomatis** (`auth.setup.ts`) sebelum tes utama dijalankan, sehingga menghemat waktu dan beban kinerja *browser*.

Berikut perintah-perintah yang dapat Anda gunakan di terminal:

### 1. Menjalankan Tes Secara Visual (UI Mode) - *Direkomendasikan saat membuat test / debugging*
Mode ini akan membuka antarmuka Playwright, di mana Anda bisa melihat *Trace Viewer*, men-*debug* baris per baris, dan memilih spesifik *test* mana yang ingin dijalankan:
```bash
npx playwright test --project=critical-regression --ui
```

### 2. Menjalankan Tes dengan Tampilan Browser Terbuka (Headed Mode)
Browser akan terbuka (ukuran layar *maximized*) dan menjalankan tes di hadapan Anda:
```bash
npx playwright test --project=critical-regression --headed
```

### 3. Menjalankan Tes di Latar Belakang (Headless Mode / CI/CD)
Tanpa ada visual browser yang muncul. Sangat cepat dan cocok dijalankan di *server* Jenkins / GitLab Runner:
```bash
npx playwright test --project=critical-regression
```

### 4. Melihat Hasil Laporan (HTML Report)
Jika ada tes yang gagal, atau jika eksekusi tes selesai, Anda bisa membuka laporannya dengan:
```bash
npx playwright show-report
```

---

## 📂 Struktur Folder Proyek

```
📦 agia
 ┣ 📂 src
 ┃ ┣ 📂 pages            => Tempat semua definisi kelas Page Object Model (POM)
 ┃ ┃ ┣ 📂 pos            => Kumpulan POM untuk area Dashboard, Sales, Payment, Orders
 ┃ ┃ ┗ 📜 ramoo-landing.page.ts
 ┃ ┗ 📂 models           => Tipe antarmuka / Interface Typescript untuk API
 ┣ 📂 tests
 ┃ ┣ 📂 ui
 ┃ ┃ ┣ 📂 critical-regression  => Kumpulan skenario spesifik E2E (contoh: pos-transaction.spec.ts)
 ┃ ┃ ┗ 📂 ramoo-id             => Kumpulan skenario Landing Page
 ┃ ┗ 📜 auth.setup.ts    => Modul yang melakukan proses Login (hanya dieksekusi sekali)
 ┣ 📜 playwright.config.ts  => Konfigurasi Playwright (Setup Project, URL, Maksimal Layar)
 ┣ 📜 package.json       => Daftar packages yang digunakan
 ┗ 📜 .env               => File Environment (Local)
```

**Happy Testing!** 🚀
