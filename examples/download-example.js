const brainxiex = require('..')({ apikey: process.env.BRAINXIE_APIKEY });

async function run() {
  const url = process.argv[2];
  if (!url) return console.error('Usage: node download-example.js <url>');
  const res = await brainxiex.api.downloader.youtube(url).catch((err) => ({ error: err.message }));
  console.log('Downloader result:', res);
}

run().catch(console.error);
