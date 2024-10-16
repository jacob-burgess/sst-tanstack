// import { database } from "./database";

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY is not set");
// }

// const dlq = new sst.aws.Queue("MassaaageVectorsDLQ");

// const massaaageQ = new sst.aws.Queue("MassaaageVectorsQ", {
//   dlq: dlq.arn,
//   transform: {
//     queue(args, opts, name) {
//       args.visibilityTimeoutSeconds = 2 * 60; // 2 minutes
//     },
//   },
// });

// massaaageQ.subscribe({
//   handler: "./packages/functions/src/massaaage.handler",
//   timeout: "2 minutes",
//   memory: "2 GB",
//   link: [database],
//   environment: {
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//   },
// });

// export const publisher = new sst.aws.Function("MassaaageVectorsPublisher", {
//   handler: "./packages/functions/src/publisher.handler",
//   url: true,
//   link: [massaaageQ, database],
//   timeout: "5 minutes",
//   environment: {
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//   },
// });

// export const outputs = {
//   massaaageQ: massaaageQ.url,
//   publisher: publisher.url,
// };
