const brainxiex = require('..')({ });

async function run() {
  const res = await brainxiex.api.raw("/ai/googleAI",{prompt: "apa itu Brainxiex"}).catch((err) => ({ error: err.message }));
  console.log('result:', res);
}

run().catch(console.error);
