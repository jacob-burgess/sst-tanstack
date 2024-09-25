const dlq = new sst.aws.Queue("VideoProcessingDLQ");

export const videoProcessingQueue = new sst.aws.Queue("VideoProcessing", {
  dlq: dlq.arn,
});

videoProcessingQueue.subscribe({
  handler: "./packages/functions/src/video/video.handler",
  url: true,
  timeout: "10 minutes",
  memory: "2 GB",
  // nodejs: { install: ["ffmpeg-static"] },
});

export const videoPublisherFunction = new sst.aws.Function("VideoPublisher", {
  handler: "./packages/functions/src/video/publisher.handler",
  url: true,
  link: [videoProcessingQueue],
});

export const outputs = {
  videoPublisherFunction: videoPublisherFunction.url,
};
