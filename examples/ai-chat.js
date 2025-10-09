const brainxiex = require('..')({ session_local: true, apikey: process.env.BRAINXIE_APIKEY });

async function run() {
  const res = await brainxiex.api.ai.LLM({
    messages: [{ role: 'user', content: 'Halo, ceritakan joke singkat.' }],
    model: 'brainxiex',
    sessionID: 'example-session',
  });

  console.log('LLM response:', res);
}

run().catch(console.error);
