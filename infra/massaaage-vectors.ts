import { database } from "./database";

const dlq = new sst.aws.Queue("MassaaageVectorsDLQ");

const massaaageQ = new sst.aws.Queue("MassaaageVectorsQ", {
  dlq: dlq.arn,
  transform: {
    queue(args, opts, name) {
      args.visibilityTimeoutSeconds = 2 * 60; // 2 minutes
    },
  },
});

massaaageQ.subscribe({
  handler: "./packages/functions/src/massaaage.handler",
  timeout: "2 minutes",
  memory: "2 GB",
  link: [database],
});

export const publisher = new sst.aws.Function("MassaaageVectorsPublisher", {
  handler: "./packages/functions/src/publisher.handler",
  url: true,
  link: [massaaageQ, database],
});

export const outputs = {
  massaaageQ: massaaageQ.url,
  publisher: publisher.url,
};
