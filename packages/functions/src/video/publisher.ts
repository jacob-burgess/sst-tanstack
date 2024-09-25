import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Handler } from "aws-lambda";
import { Resource } from "sst";
import { z } from "zod";

const client = new SQSClient();

const PublisherInput = z.object({
  ids: z.array(z.string()),
});

export const handler: Handler = async (event, context) => {
  const input = PublisherInput.safeParse(JSON.parse(event?.body));
  if (!input.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Invalid input ${input.error.message}` }),
    };
  }
  const { ids } = input.data;

  const commands = ids.map(
    (id) =>
      new SendMessageCommand({
        QueueUrl: Resource.VideoProcessing.url,
        MessageBody: id,
      })
  );

  try {
    await Promise.all(commands.map((command) => client.send(command)));
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        { message: "Error sending message to SQS" },
        null,
        2
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "sent" }, null, 2),
  };
};
