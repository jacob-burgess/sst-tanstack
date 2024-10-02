import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { asc, db, isNull } from "@sst-tanstack/core/database/index";
import { transcriptEmbeddingTable } from "@sst-tanstack/core/embedding/embedding.sql";
import { Resource } from "sst";

const sqsClient = new SQSClient();

async function sendToQ(ids: number[]) {
  const command = new SendMessageCommand({
    QueueUrl: Resource.MassaaageVectorsQ.url,
    MessageBody: JSON.stringify(ids),
  });

  try {
    const response = await sqsClient.send(command);
    console.log(
      `Successfully sent message to SQS, message id: ${response.MessageId}`
    );
  } catch (error) {
    console.error("Error sending message to SQS:", error);
  }
}

const BATCH_SIZE = 1000;

export const handler = async (event: any) => {
  console.log("publisher function received request");

  const allIds = await db
    .select({ id: transcriptEmbeddingTable.id })
    .from(transcriptEmbeddingTable)
    .where(isNull(transcriptEmbeddingTable.vector))
    .orderBy(asc(transcriptEmbeddingTable.id))
    .then((rows) => rows.map((row) => row.id));

  // send to sqs in batches of 1000
  for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
    const batch = allIds.slice(i, i + BATCH_SIZE);
    await sendToQ(batch);
    console.log(`Sent batch of ${batch.length} ids to SQS`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "sent" }, null, 2),
  };
};
