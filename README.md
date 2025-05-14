# Brainxiex

## Deskripsi
**Brainxiex** adalah library AI yang dirancang untuk membantu dalam berbagai fungsi, seperti menjawab pertanyaan, melakukan pencarian, dan menghasilkan konten kreatif. Dengan Brainxiex, Anda dapat dengan mudah mengintegrasikan kecerdasan buatan ke dalam aplikasi Anda.

## Instalasi
Untuk menginstal `brainxiex`, gunakan perintah npm berikut:

```bash
npm install brainxiex
```

Jika Anda ingin menginstal dari repositori GitHub, gunakan:

```bash
npm install https://github.com/Barqah-Xiex/brainxiex.git
```

## Penggunaan
Berikut adalah contoh dasar penggunaan `brainxiex`:

```javascript
const brainxiex = require('brainxiex')({
    // apikey: 'YOUR_API_KEY', // Un-comment this line to use an API key
    session_local: true // Set to true for local session management
});

// CATATAN: Jangan gunakan apikey jika tidak memilikinya.
// CATATAN: Jangan gunakan session_local jika ingin menyimpan data di server.

const prompt = "Apakah Rapunzel suka makan kerupuk?";
const model = "brainxiex"; // Model yang digunakan (brainxiex, miaw, cecep)
const session_id = "brainxiex_module123"; // ID sesi opsional untuk menyimpan data

brainxiex.ai(prompt, model, session_id)
    .then(res => console.log(res.answer));

// Jika ingin mode full, seperti OpenAI
brainxiex.ai.LLM({
    messages: [{role: "user", content: "Apakah Rapunzel suka makan kerupuk?"}],
    model: "brainxiex",
    // sessionID: "brainxiex_module123", // Uncomment if session ID is necessary
    // Jangan gunakan sessionID jika tidak diperlukan
})
    .then(res => console.log(res.answer));
```

## Daftar Fungsi
Berikut adalah fungsi-fungsi yang tersedia dalam `brainxiex`:

- `version` - Menampilkan versi library
- `ai` - Mengakses fungsi AI utama
- `ai.ai_simple` - Fungsi AI sederhana
- `ai.LLM` - Mengakses model AI besar
- `ai_simple` - Fungsi AI dengan antarmuka sederhana
- `LLM` - Model AI besar
- `downloader` - Mengunduh konten dari URL
- `image` - Mengelola gambar
- `media2buffer` - Mengonversi media menjadi buffer
- `minigame` - Memainkan mini game
- `random` - Menghasilkan nilai acak
- `search` - Melakukan pencarian
- `toURL` - Mengonversi teks menjadi URL
- Fungsi media sosial:
  - `facebook`, `instagram`, `tiktok`, `twitter`, `youtube` (alias: `fb`, `ig`, `tt`, `tw`, `yt`)
- Fungsi interaktif:
  - `play`, `remini`, `hitamkan`, `toAnime`, `imagine`, `nulis`, `sticker`
- Fungsi kartu:
  - `welcomeCard`, `goodbyeCard`, `banner`
- Fungsi screenshot:
  - `screenshot`, `fakechat`, `ss`, `qc`
- Fungsi permainan:
  - `family100`, `tebakgambar`, `caklontong`, `siapakahaku`, `tebakbendera`, `tebakkalimat`, `tebakkata`, `tebakkimia`, `tebaklirik`, `tebaktebakan`
- Pertanyaan umum:
  - `apakah`, `bisakah`, `citacita`, `truth`, `dare`, `fakta`, `gombal`, `hobi`, `katamutiara`, `tebakan`, `watak`
- Fungsi pencarian:
  - `pinterest`, `google`, `youtubeSearch`, `yts`

## Kontribusi
Kami menyambut baik kontribusi dari semua orang. Jika Anda memiliki saran atau perbaikan, silakan buat pull request atau buka isu di repositori ini.

## Lisensi
<<<<<<< HEAD
Brainxiex dilisensikan di bawah [MIT License](LICENSE).
=======
Brainxiex dilisensikan di bawah [MIT License](LICENSE).
>>>>>>> f094130 (Auto commit on 2024-09-24 12:48:45)
