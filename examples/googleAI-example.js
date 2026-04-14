const brainxiex = require('..')({ });

async function run() {
  const res = await brainxiex.api.tools.googleAI("siapa BarqahXiex ?");
  console.log('result:', res);
}

run().catch(console.error);
