# Music Explorer

**NIM:** Rifael Eurico Sitorus
**NIM:** 123140077

## 📚 Deskripsi Proyek

Music Explorer adalah aplikasi web untuk mencari musik, album, dan artis favorit Anda dengan mudah. Aplikasi ini menggunakan **iTunes Search API** untuk memberikan hasil pencarian yang lengkap beserta preview audio dan informasi harga. Fitur utama meliputi form pencarian interaktif, tabel hasil yang detail, audio preview player, dan playlist builder dengan penyimpanan data ke localStorage.

## ✨ Fitur Utama

1. **Form Pencarian** - Input keyword dan pilih tipe media (Lagu, Album, Artis, Podcast, dll)
2. **Tabel Hasil Pencarian** - Tampilkan artwork, nama track, artis, dan harga dari hasil pencarian
3. **Audio Preview Player** - Dengarkan sampel musik langsung dari aplikasi
4. **Playlist Builder** - Tambahkan/hapus track favorit dan simpan ke localStorage
5. **Sorting & Filtering** - Urutkan hasil berdasarkan release date atau price

## 🚀 Cara Instalasi & Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

### Instalasi

1. Clone repository
\`\`\`bash
git clone https://github.com/eltoruz/uts-pemweb-123140077.git
cd uts-pemweb-123140077
cd music-explorer-123140077
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Jalankan development server
\`\`\`bash
npm start
\`\`\`

4. Buka browser dan akses `http://localhost:3000`

## 🔧 Teknologi yang Digunakan

- **Frontend Framework:** React JS (CRA) 
- **Styling:** CSS
- **API:** iTunes Search API (Free - No API Key Required)
- **Storage:** localStorage untuk menyimpan playlist
- **Build Tool:** Vercel (Deployment)

## 📦 API Integration

Aplikasi menggunakan **iTunes Search API** yang tersedia gratis tanpa memerlukan API key. 

Contoh request:
\`\`\`
GET https://itunes.apple.com/search?term=taylor+swift&media=music&limit=10
\`\`\`

Parameter yang digunakan:
- `term` - Keyword pencarian
- `media` - Tipe media (music, musicArtist, album, dll)
- `limit` - Jumlah hasil maksimal


## 📸 Screenshot Aplikasi

### Halaman Utama
![Music Explorer Screenshot](halaman-utama.png)

### Hasil Pencarian
![Search Results](hasil-pencarian.png)

### Playlist Builder
![Playlist](playlist.png)

## ⚠️ Batasan

- iTunes Search API memiliki rate limiting, pastikan tidak melakukan request terlalu sering
- Preview audio hanya tersedia untuk konten tertentu
- Data playlist hanya tersimpan di browser lokal (tidak tersinkronisasi antar device)


## ⚠️ LINK DEPLOYMENT
https://uts-pemweb-123140077-music-explorer.vercel.app/





