import { SQSEvent, Handler } from "aws-lambda";

export const handler: Handler = async (event: SQSEvent) => {
  console.log(new Date().toISOString(), "\n", JSON.stringify(event, null, 2));
};
