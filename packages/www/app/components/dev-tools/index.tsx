import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterDevtools } from "~/components/dev-tools/tsr-devtools";
import { TailwindIndicator } from "~/components/dev-tools/tw-indicator";

export function DevTools() {
  return (
    <>
      <TailwindIndicator />
      <RouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );
}
