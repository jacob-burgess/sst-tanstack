import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/episodes/")({
  component: () => <div>Hello /episodes/!</div>,
});
