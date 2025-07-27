import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve('./src/Config/.env.dev') })

import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const summarizeText = async (text) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an assistant that summarizes notes in one short paragraph.'
      },
      {
        role: 'user',
        content: `Summarize this note: ${text}`
      }
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 150
  });

  return response.choices[0].message.content;
};
