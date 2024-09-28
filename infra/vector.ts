export const vector =
  $app.stage === "production"
    ? new sst.aws.Vector("TranscriptVectors", {
        dimension: 1536,
      })
    : sst.aws.Vector.get(
        "TranscriptVectors",
        "sst-tanstack-production-transcriptvectorsdatabasecluster"
      );

export const outputs = {
  Vector: vector.clusterID,
};
