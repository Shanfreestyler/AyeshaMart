require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

const AI_MODEL = 'gpt-4.1';

const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
});

function getAiClient() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is missing. Add it to .env.local.');
  }

  return client;
}

async function createAiCompletion({
  prompt,
  systemPrompt,
  model = AI_MODEL,
  temperature = 0,
}) {
  const aiClient = getAiClient();

  const response = await aiClient.chat.completions.create({
    model,
    temperature,
    messages: [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt },
    ],
  });

  return response.choices[0]?.message?.content ?? '';
}

module.exports = {
  AI_MODEL,
  getAiClient,
  createAiCompletion,
};
