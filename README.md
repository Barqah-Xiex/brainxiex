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

// Jika ingin mode full, seperti OpenAI
brainxiex.api.ai({
    messages: [{role: "user", content: "Apakah Rapunzel suka makan kerupuk?"}],
    model: "brainxiex",
    // sessionID: "brainxiex_module123", // Uncomment if session ID is necessary
    // Jangan gunakan sessionID jika tidak diperlukan
})
    .then(res => console.log(res.answer));

// Jika ingin lebih simpel
brainxiex.api.ai.simple(prompt, model, session_id)
    .then(res => console.log(res.answer));

```

## Daftar Fungsi
Berikut adalah fungsi-fungsi yang tersedia dalam `brainxiex`:

- `version` - Menampilkan versi library
- `api.ai` - Mengakses fungsi AI utama
- `api.ai.ai_simple` - Fungsi AI sederhana
- `api.ai.LLM` - Mengakses model AI besar
- `api.ai_simple` - Fungsi AI dengan antarmuka sederhana
- `api.LLM` - Model AI besar
- `api.downloader` - Mengunduh konten dari URL
- `api.image` - Mengelola gambar
- `api.media2buffer` - Mengonversi media menjadi buffer
- `api.minigame` - Memainkan mini game
- `api.random` - Menghasilkan nilai acak
- `api.search` - Melakukan pencarian
- `api.toURL` - Mengonversi teks menjadi URL
- Fungsi media sosial:
  - `api.facebook`, `api.instagram`, `api.tiktok`, `api.twitter`, `api.youtube` (alias: `api.fb`, `api.ig`, `api.tt`, `api.tw`, `api.yt`)
- Fungsi interaktif:
  - `api.play`, `api.remini`, `api.hitamkan`, `api.toAnime`, `api.imagine`, `api.nulis`, `api.sticker`
- Fungsi kartu:
  - `api.welcomeCard`, `api.goodbyeCard`, `api.banner`
- Fungsi screenshot:
  - `api.screenshot`, `api.fakechat`, `api.ss`, `api.qc`
- Fungsi permainan:
  - `api.family100`, `api.tebakgambar`, `api.caklontong`, `api.siapakahaku`, `api.tebakbendera`, `api.tebakkalimat`, `api.tebakkata`, `api.tebakkimia`, `api.tebaklirik`, `api.tebaktebakan`
- Pertanyaan umum:
  - `api.apakah`, `api.bisakah`, `api.citacita`, `api.truth`, `api.dare`, `api.fakta`, `api.gombal`, `api.hobi`, `api.katamutiara`, `api.tebakan`, `api.watak`
- Fungsi pencarian:
  - `api.pinterest`, `api.google`, `api.youtubeSearch`, `api.yts`

## Kontribusi
Kami menyambut baik kontribusi dari semua orang. Jika Anda memiliki saran atau perbaikan, silakan buat pull request atau buka isu di repositori ini.

## Lisensi
<<<<<<< HEAD
Brainxiex dilisensikan di bawah [MIT License](LICENSE).
=======
Brainxiex dilisensikan di bawah [MIT License](LICENSE).
>>>>>>> f094130 (Auto commit on 2024-09-24 12:48:45)
