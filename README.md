# 🎉 Ucapan Pernikahan API

API sederhana untuk mengelola ucapan pernikahan yang akan ditampilkan di aplikasi undangan digital.

## 🛠️ Teknologi yang Digunakan

- **Node.js + Express**
- **PostgreSQL (Supabase)**
- **Railway (untuk hosting)**
- **dotenv** untuk environment variable
- **pg** untuk koneksi PostgreSQL

---

## 📦 Fitur

- ✅ Menambahkan ucapan (`POST /ucapan`)
- ✅ Menampilkan semua ucapan (`GET /ucapan`)
- ✅ Mengedit ucapan berdasarkan ID (`PUT /ucapan/:id`)
- ✅ Menghapus ucapan berdasarkan ID (`DELETE /ucapan/:id`)

---

## 🗂 Struktur Tabel

```sql
CREATE TABLE ucapan_pernikahan (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  ucapan TEXT NOT NULL,
  hadir BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
