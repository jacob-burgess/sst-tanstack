import { OpenAI } from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string) {
  const response = await client.embeddings.create({
    input: [text],
    model: "text-embedding-ada-002",
  });

  return response.data[0]?.embedding;
}
