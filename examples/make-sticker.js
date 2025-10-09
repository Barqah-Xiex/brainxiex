const fs = require('fs');
const brainxiex = require('..')({ apikey: process.env.BRAINXIE_APIKEY });

async function run() {
  const input = process.argv[2] || './examples/sample.jpg';
  const out = process.argv[3] || './examples/sticker.webp';
  const stickerBuffer = await brainxiex.api.image
    .sticker(input)
    .catch((err) => ({ error: err.message }));
  if (stickerBuffer && stickerBuffer.error) {
    console.error('Error:', stickerBuffer.error);
    process.exit(1);
  }
  fs.writeFileSync(out, stickerBuffer);
  console.log('Sticker written to', out);
}

run().catch(console.error);
