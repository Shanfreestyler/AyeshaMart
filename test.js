const { createAiCompletion, AI_MODEL } = require('./src/lib/ai/client');

async function main() {
  try {
    const response = await createAiCompletion({
      prompt: 'Reply with exactly: API working',
      systemPrompt: 'You are a concise assistant.',
    });

    console.log(`Model: ${AI_MODEL}`);
    console.log(response);
  } catch (err) {
    console.error(err.message);
  }
}

main().catch(console.error);
