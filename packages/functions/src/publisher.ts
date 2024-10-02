import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { TranscriptEmbedding } from "@sst-tanstack/core/embedding/transcript-embedding";
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

const BATCH_SIZE = 500;

export const handler = async (event: any) => {
  console.log("publisher function received request");
  const limit = BATCH_SIZE;
  let offset = 0;
  const total = await TranscriptEmbedding.count({});
  // const total = 50;

  while (offset < total) {
    const ids = await TranscriptEmbedding.listIds({ limit, offset });
    console.log(`Sending batch of ${ids.length} messages to SQS`);
    await sendToQ(ids);
    offset += limit;
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "sent" }, null, 2),
  };
};
