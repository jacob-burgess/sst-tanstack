import { Await, createFileRoute, defer } from "@tanstack/react-router";
import { Suspense } from "react";

const fetchData = async ({ delay }: { delay?: number }) => {
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return delay ? `${delay}ms` : "No delay";
};

export const Route = createFileRoute("/streaming/")({
  loader: async () => {
    const slow = fetchData({ delay: 1000 });
    const slower = fetchData({ delay: 2000 });
    const slowest = fetchData({ delay: 3000 });
    const fast = await fetchData({});
    return {
      slow: defer(slow),
      slower: defer(slower),
      slowest: defer(slowest),
      fast,
    };
  },
  component: () => <PageComponent />,
});

const PageComponent = () => {
  const { slow, slower, slowest, fast } = Route.useLoaderData();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        textAlign: "right",
      }}
    >
      <div>non-deferred: {fast}</div>
      <div>
        deffered (slow): <StreamText promise={slow} />
      </div>
      <div>
        deffered (slower): <StreamText promise={slower} />
      </div>
      <div>
        deffered (slowest): <StreamText promise={slowest} />
      </div>
    </div>
  );
};

function StreamText({ promise }: { promise: Promise<any> }) {
  return (
    <Suspense fallback={"Loading..."}>
      <Await promise={promise}>
        {(data) => {
          return data;
        }}
      </Await>
    </Suspense>
  );
}
