// import OpenAI from "openai";
// import { db } from "./src/database";
// import { desc, inArray, sql } from "drizzle-orm";
// import { testVectorTable } from "./src/embedding/test-embedding.sql";
// import { transcriptEmbeddingTable } from "./src/embedding/embedding.sql";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function createEmbedding(text: string) {
//   const response = await openai.embeddings.create({
//     input: text,
//     model: "text-embedding-ada-002",
//   });

//   if (!response.data[0]?.embedding) {
//     throw new Error("Error creating embedding");
//   }

//   return response.data[0].embedding;
// }

// function query(vector: number[]) {
//   const vString = `[${vector.join(",")}]`;
//   return db
//     .select({
//       text: testVectorTable.text,
//       distance: sql`DISTANCE(TO_VECTOR(${vString}), embedding, 'cosine') as distance`,
//       id: testVectorTable.id,
//     })
//     .from(testVectorTable)
//     .orderBy(desc(sql`distance`));
// }

// async function play() {
//   const embedding = await createEmbedding("blisters wait what");
//   const results = await query(embedding);
//   console.log(results);
// }

// async function batchUpdateVectors({
//   limit = 100,
//   offset = 0,
// }: {
//   limit: number;
//   offset: number;
// }) {
//   const vectors = await db
//     .select({
//       id: transcriptEmbeddingTable.id,
//       vector: sql`TO_VECTOR (CAST(embedding as char)) as embedding`,
//     })
//     .from(transcriptEmbeddingTable)
//     .limit(limit)
//     .offset(offset);

//   for (const vector of vectors) {
//     // const response
//   }

//   return vectors;
// }

// async function load() {
//   // batch in 100
// }

// async function main() {
//   // await play();
// }

// main()
//   .then(() => {
//     console.log("Done");
//   })
//   .catch((error) => {
//     console.error("BIGTIME ERROROROROROORORO", error);
//   });
