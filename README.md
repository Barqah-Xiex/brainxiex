# Brainxiex

## Deskripsi

**Brainxiex** adalah library AI yang dirancang untuk membantu dalam berbagai fungsi, seperti menjawab pertanyaan, melakukan pencarian, dan menghasilkan konten kreatif. Dengan Brainxiex, Anda dapat dengan mudah mengintegrasikan kecerdasan buatan ke dalam aplikasi Anda.

---

## Instalasi

Untuk menginstal `brainxiex`, gunakan perintah npm berikut:

```bash
npm install brainxiex
```

Atau dari GitHub:

```bash
npm install https://github.com/Barqah-Xiex/brainxiex.git
```

---

## Penggunaan Dasar

```javascript
const brainxiex = require('brainxiex')({
  // apikey: 'YOUR_API_KEY',
  session_local: true,
});

// CATATAN:
// - Jangan gunakan apikey jika tidak punya
// - Jangan gunakan session_local jika ingin simpan di server

const prompt = 'Apakah Rapunzel suka makan kerupuk?';
const model = 'brainxiex';
const session_id = 'brainxiex_module123';

// Mode full (mirip OpenAI)
brainxiex.api.ai({
  messages: [{ role: 'user', content: prompt }],
  model,
}).then((res) => console.log(res.answer));

// Mode simple
brainxiex.api.ai.simple(prompt, model, session_id)
  .then((res) => console.log(res.answer));
```

---

# 🧠 Struktur Object (Mapping)

Setelah inisialisasi:

```js
const brainxiex = require('brainxiex')({ options });
```

Struktur yang dihasilkan:

```js
{
  version: '1.3.0',
  api: { ... },
  utils: { ... }
}
```

---

## 📦 version

```js
brainxiex.version
```

Versi library.

---

## 🧠 api.ai (AI / LLM)

```js
brainxiex.api.ai(payload)
brainxiex.api.ai.LLM(payload)
brainxiex.api.ai.simple(prompt, model?, sessionID?, images?)
```

---

## 📥 api.downloader

```js
brainxiex.api.downloader.reels(url)
brainxiex.api.downloader.facebook(url)
brainxiex.api.downloader.instagram(url)
brainxiex.api.downloader.tiktok(url)
brainxiex.api.downloader.twitter(url)
brainxiex.api.downloader.youtube(url)
```

Alias:

```js
brainxiex.api.downloader.fb(url)
brainxiex.api.downloader.ig(url)
brainxiex.api.downloader.tt(url)
brainxiex.api.downloader.tw(url)
brainxiex.api.downloader.yt(url)
```

Tambahan:

```js
brainxiex.api.downloader.play(query)
```

---

## 🖼️ api.image

```js
brainxiex.api.image.remini(input)
brainxiex.api.image.hitamkan(input)
brainxiex.api.image.toAnime(input)
brainxiex.api.image.imagine(prompt)
brainxiex.api.image.nulis(text)
brainxiex.api.image.sticker(input)
```

Generator:

```js
brainxiex.api.image.welcomeCard(data)
brainxiex.api.image.goodbyeCard(data)
brainxiex.api.image.banner(data)
```

Tools:

```js
brainxiex.api.image.screenshot(url)
brainxiex.api.image.fakechat(data)
```

---

## 🔄 api.media2buffer

```js
brainxiex.api.media2buffer(input)
```

Convert Buffer / file / URL → Buffer

---

## 🎮 api.minigame

```js
brainxiex.api.minigame.family100()
brainxiex.api.minigame.tebakgambar()
brainxiex.api.minigame.caklontong()
brainxiex.api.minigame.siapakahaku()
brainxiex.api.minigame.tebakbendera()
brainxiex.api.minigame.tebakkalimat()
brainxiex.api.minigame.tebakkata()
brainxiex.api.minigame.tebakkimia()
brainxiex.api.minigame.tebaklirik()
brainxiex.api.minigame.tebaktebakan()
```

---

## 🎲 api.random

```js
brainxiex.api.random.apakah(text)
brainxiex.api.random.bisakah(text)
brainxiex.api.random.citacita()
brainxiex.api.random.truth()
brainxiex.api.random.dare()
brainxiex.api.random.fakta()
brainxiex.api.random.gombal()
brainxiex.api.random.hobi()
brainxiex.api.random.katamutiara()
brainxiex.api.random.tebakan()
brainxiex.api.random.watak()
```

---

## 🔎 api.search

```js
brainxiex.api.search.pinterest(query)
brainxiex.api.search.google(query)
brainxiex.api.search.youtubeSearch(query)
brainxiex.api.search.yts(query)
```

---

## 🛠️ api.tools

```js
brainxiex.api.tools.textToBase64(text)
brainxiex.api.tools.base64ToText(base64)
brainxiex.api.tools.textToEnchant(text)
brainxiex.api.tools.enchantToText(text)
brainxiex.api.tools.textToSunda(text)
brainxiex.api.tools.sundaToText(text)
```

File utils:

```js
brainxiex.api.tools.extToMimetype(ext)
brainxiex.api.tools.mimetypeToExt(mimetype)
```

Lainnya:

```js
brainxiex.api.tools.gtts(text)
brainxiex.api.tools.formater(data)
brainxiex.api.tools.googleAI(prompt)
```

---

## 🕵️ api.stalk

```js
brainxiex.api.stalk.tiktokstalk(username)
brainxiex.api.stalk.instagramstalk(username)
brainxiex.api.stalk.robloxstalk(username)
```

---

## 🛠️ utils

Utility functions untuk berbagai kebutuhan:

### Type Checking

```js
brainxiex.utils.isJSON(param)
brainxiex.utils.isBigint(param)
brainxiex.utils.isBool(param)
brainxiex.utils.isBoolean(param)
brainxiex.utils.isFunction(param)
brainxiex.utils.isFunc(param)
brainxiex.utils.isFxn(param)
brainxiex.utils.isFn(param)
brainxiex.utils.isNumber(param)
brainxiex.utils.isNum(param)
brainxiex.utils.isNumeric(param)
brainxiex.utils.isObject(param)
brainxiex.utils.isObj(param)
brainxiex.utils.isObjectValue(param)
brainxiex.utils.isString(param)
brainxiex.utils.isStr(param)
brainxiex.utils.isText(param)
brainxiex.utils.isSymbol(param)
brainxiex.utils.isSym(param)
brainxiex.utils.isSet(param)
brainxiex.utils.isSetValue(param)
brainxiex.utils.isBuffer(param)
brainxiex.utils.isBuf(param)
brainxiex.utils.isStream(obj)
brainxiex.utils.isReadableStream(obj)
brainxiex.utils.isWritableStream(obj)
brainxiex.utils.isTransformStream(obj)
```

### String & URL

```js
brainxiex.utils.string(obj)
brainxiex.utils.encodeURLParameter(obj, sep?, eq?, name?)
brainxiex.utils.decodeURLParameter(params?)
```

### Cookie

```js
brainxiex.utils.parseCookies(cookieHeader?)
brainxiex.utils.serializeCookie(cookie)
brainxiex.utils.setCookie(res, name, value, maxAgeInSeconds?, path?)
```

### File System & Database

```js
brainxiex.utils.fs // Extended fs module
brainxiex.utils.savedb(path, data)
brainxiex.utils.loaddb(path)
brainxiex.utils.detectFileType(buffer)
```

### Logging & Utilities

```js
brainxiex.utils.log(...args)
brainxiex.utils.typeLog(text, delay?)
brainxiex.utils.logDetailedError(err, evalCode?)
brainxiex.utils.sleep(ms)
brainxiex.utils.formatDurasiDate(start, end?)
```

### HTTP

```js
brainxiex.utils.axios // Axios instance with custom User-Agent
brainxiex.utils.userAgent
```

---

## 🌐 api.toURL

```js
brainxiex.api.toURL(input)
```

Upload Buffer/file/URL → URL

---

## ⚙️ api.raw

```js
brainxiex.api.raw(endpoint, payload)
```

Low-level request (advanced).

---

## Contoh Tambahan

### AI dengan session

```js
const brainxiex = require('brainxiex')({ session_local: true });

async function chat() {
  const res = await brainxiex.api.ai.LLM({
    messages: [{ role: 'user', content: 'Halo!' }],
    model: 'brainxiex',
    sessionID: 'test-session',
  });
  console.log(res);
}

chat();
```

---

### Image → Sticker

```js
const fs = require('fs');
const brainxiex = require('brainxiex')({});

async function run() {
  const buf = await brainxiex.api.image.sticker('./image.jpg');
  fs.writeFileSync('sticker.webp', buf);
}

run();
```

---

## Catatan

- Semua fungsi return **Promise**
- Error format:
```js
{ error: 'message' }
```
- Endpoint media return **Buffer**

---

## 📘 OpenAPI Documentation

Semua endpoint tersedia di file `openapi.json`.
Gunakan dokumentasi OpenAPI ini untuk melihat semua path, tag, dan parameter API yang didukung di server Brainxiex.

Contoh path:

```js
/api/ai/chat/completions
/api/downloader/youtube
/api/image/resize
/api/whatsapp/sendText
```

Jika endpoint belum tersedia di wrapper library, panggil langsung dengan `api.raw`:

```js
const result = await brainxiex.api.raw('ai/chat/completions', {
  prompt: 'Halo',
  model: 'brainxiex',
});
console.log(result);
```

---

## 💡 VS Code Suggestions

Untuk mendapatkan saran otomatis di VS Code, ada file snippet workspace di `.vscode/brainxiex.code-snippets`.
Cukup buka workspace ini di VS Code dan gunakan prefix seperti `brainxiex`, `bxai`, `bxyt`, `bximg`, atau `bxraw`.

Contoh snippet otomatis:

```js
const brainxiex = require('brainxiex')({
  apikey: 'YOUR_API_KEY',
  BASE: 'https://brainxiex.com',
});

const response = await brainxiex.api.ai.simple('Halo');
```

---

## License

MIT