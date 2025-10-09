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
  session_local: true, // Set to true for local session management
});

// CATATAN: Jangan gunakan apikey jika tidak memilikinya.
// CATATAN: Jangan gunakan session_local jika ingin menyimpan data di server.

const prompt = 'Apakah Rapunzel suka makan kerupuk?';
const model = 'brainxiex'; // Model yang digunakan (brainxiex, miaw, cecep)
const session_id = 'brainxiex_module123'; // ID sesi opsional untuk menyimpan data

// Jika ingin mode full, seperti OpenAI
brainxiex.api
  .ai({
    messages: [{ role: 'user', content: 'Apakah Rapunzel suka makan kerupuk?' }],
    model: 'brainxiex',
    // sessionID: "brainxiex_module123", // Uncomment if session ID is necessary
    // Jangan gunakan sessionID jika tidak diperlukan
  })
  .then((res) => console.log(res.answer));

// Jika ingin lebih simpel
brainxiex.api.ai.simple(prompt, model, session_id).then((res) => console.log(res.answer));
```

# brainxiex

brainxiex is a lightweight JavaScript client library that wraps a set of remote API endpoints
(`xiex.my.id`) to provide convenience helpers for AI calls, image manipulation, downloads and
utility tools. The library focuses on simple inputs (Buffer, file path, URL) and returns either
raw Buffers (for media endpoints) or parsed JSON objects for regular APIs.

This repo intentionally includes JSDoc comments so VS Code (and other editors) can surface
intellisense and parameter hints.

## Quick start

Install (if published) or use from local project:

```bash
# local usage
node -e "const bx = require('./')({ session_local: true }); console.log(Object.keys(bx));"
```

## Usage

Create a client and call APIs. The module exports a factory function that accepts a config object.

```js
const brainxiex = require('.')({
  apikey: process.env.BRAINXIE_APIKEY,
  BASE: 'http://xiex.my.id',
  session_local: true,
});

// AI example (LLM)
brainxiex.api
  .ai({
    model: 'brainxiex',
    messages: [{ role: 'user', content: 'Halo! Ceritakan lelucon singkat.' }],
  })
  .then((res) => console.log(res))
  .catch(console.error);

// Image example (buffer/file/URL accepted)
// returns a Buffer (or an error object)
brainxiex.api.image.remini('./tests/sample.jpg').then((bufOrErr) => console.log(bufOrErr));
```

## API Reference (high-level)

Top-level exported object contains:

- `version` — string from package.json
- `api` — namespace containing modules:
  - `ai` — AI helpers
    - `.LLM(payload)` — low-level LLM request
    - `.simple(prompt, model?, sessionID?, images?)` — convenience wrapper
  - `image` — image utilities that accept Buffer|path|URL and return Buffers
    - `remini`, `hitamkan`, `toAnime`, `imagine`, `nulis`, `sticker`, `welcomeCard`, `goodbyeCard`, `banner`, `screenshot`, `fakechat`
  - `downloader` — download helpers for social platforms (reels, tiktok, youtube, etc.)
  - `media2buffer` — internal helper to convert Buffer|file|URL to Buffer
  - `toURL` — uploads a Buffer/file/URL to a remote uploader and returns the remote URL
  - `minigame`, `random`, `search`, `tools`, `stalk` — various helpers calling remote endpoints

All network helpers return Promises that resolve to either the remote JSON object or an
error object with an `error` property. Media endpoints typically return Buffers (or will reject
with an error). Callers should check returned values.

## Examples

AI chat (maintaining session):

```js
const brainxiex = require('.')({ session_local: true, apikey: 'your-key' });

async function chat() {
  const res = await brainxiex.api.ai.LLM({
    messages: [{ role: 'user', content: 'Siapa presiden Indonesia saat ini?' }],
    model: 'brainxiex',
    sessionID: 'example-session',
  });
  console.log('LLM response:', res);
}

chat().catch(console.error);
```

Image flow (upload local file and generate sticker):

```js
const brainxiex = require('.')({ apikey: 'xxx' });

async function makeSticker() {
  const stickerBuffer = await brainxiex.api.image.sticker('./images/my-face.jpg');
  if (stickerBuffer && stickerBuffer.error) return console.error('err', stickerBuffer.error);
  require('fs').writeFileSync('sticker.webp', stickerBuffer);
}

makeSticker().catch(console.error);
```

## Developer notes

- JSDoc is included in source files to improve editor suggestions. I added `jsconfig.json` and
  `.vscode/settings.json` to enable checkJs and completion of function calls in VS Code.
- Network calls use `axios` and follow a simple pattern: try -> return data or { error }.
- `media2buffer` is the core utility to normalize inputs (Buffer | path | URL) into a Buffer.

## Contributing

Feel free to open issues or PRs. Keep functions small and documented using JSDoc for best DX in
editors.

## License

MIT
