import {
  and,
  db,
  inArray,
  isNotNull,
  isNull,
} from "@sst-tanstack/core/database/index";
import { transcriptEmbeddingTable } from "@sst-tanstack/core/embedding/embedding.sql";
import { TranscriptEmbedding } from "@sst-tanstack/core/embedding/transcript-embedding";
import { z } from "zod";

export async function handler(event: any) {
  console.log("masaaage subscriber received event");

  // parse the event
  const parsed = parseEvent(event);
  if (!parsed.success) {
    return {
      code: 400,
      success: false,
      error: parsed.error,
    };
  }
  console.log(`parsed ${parsed.ids.length} ids`, parsed.ids);

  const CHUNK_SIZE = 500;
  // chunk ids into lists of CHUNK_SIZE
  const chunkedIds: number[][] = [];
  for (let i = 0; i < parsed.ids.length; i += CHUNK_SIZE) {
    chunkedIds.push(parsed.ids.slice(i, i + CHUNK_SIZE));
  }

  for (const ids of chunkedIds) {
    try {
      // get the data from the database
      const data = await db
        .select({
          id: transcriptEmbeddingTable.id,
          vector: transcriptEmbeddingTable.embedding,
        })
        .from(transcriptEmbeddingTable)
        .where(
          and(
            inArray(transcriptEmbeddingTable.id, ids),
            isNotNull(transcriptEmbeddingTable.embedding),
            isNull(transcriptEmbeddingTable.vector)
          )
        );

      if (data.length === 0) {
        console.log("no results with the given ids bro");
        return {
          code: 404,
          success: false,
          error: "no results with the given ids bro",
        };
      }

      console.log(`Found ${data.length} records to update.`);

      // update the vectors
      try {
        await TranscriptEmbedding.updateVectorById(
          data as TranscriptEmbedding.UpdateSchema
        );
      } catch (error) {
        console.error("Error updating transcript embeddings", error);
        return {
          code: 500,
          success: false,
          error: "Error updating transcript embeddings",
        };
      }
    } catch (error) {
      console.error("Error processing records", error);
      return {
        code: 500,
        success: false,
        error: "Error processing records",
      };
    }
  }

  console.log("Finished processing all records.");

  return {
    success: true,
  };
}

type Success = {
  success: true;
  ids: number[];
};

type Error = {
  success: false;
  error: string;
};

function parseEvent(event: any): Success | Error {
  if (!event.Records) {
    console.log("no records provided");
    return {
      success: false,
      error: "no records provided",
    };
  }

  const bodies = event.Records.map((record: any) => JSON.parse(record.body));
  const bodiesSchema = z.array(z.array(z.number()));
  const parsedBodies = bodiesSchema.safeParse(bodies);
  if (!parsedBodies.success) {
    console.error("bodies must be an array", parsedBodies.error);
    return {
      success: false,
      error: "bodies must be an array",
    };
  }

  let ids: number[] = [];

  for (const body of parsedBodies.data) {
    ids.push(...body);
  }

  const idsSchema = z.array(z.number());
  const parsedIds = idsSchema.safeParse(ids);
  if (!parsedIds.success) {
    console.error("ids must be an array", parsedIds.error);
    return {
      success: false,
      error: "ids must be an array",
    };
  }

  return {
    success: true,
    ids,
  };
}
