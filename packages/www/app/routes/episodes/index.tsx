import { Episode } from "@sst-tanstack/core/episode/episode";
import { Await, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import EpisodeCard from "~/components/episode-card";

const listEpisodes = createServerFn(
  "GET",
  async (params?: Episode.ListParams) => {
    return Episode.list(params ?? {});
  }
);

export const Route = createFileRoute("/episodes/")({
  loader: async () => {
    const episodes = await listEpisodes({ limit: 9, offset: 0 });
    return { episodes };
  },
  component: EpisodesPage,
});

function EpisodesPage() {
  const { episodes } = Route.useLoaderData();

  return (
    <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-yellow-400">Kill</span>{" "}
        <span className="text-red-600">Tony</span>
      </h1>
      {episodes?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </>
      ) : (
        <p>No episodes yet.</p>
      )}
      {/* <div className="w-full">
        <Suspend promise={episodes} />
      </div> */}
    </section>
  );
}

const Suspend = ({ promise }: { promise: Promise<any> }) => {
  return (
    <Suspense fallback={"Loading..."}>
      <Await promise={promise}>
        {(data) => {
          return data?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((episode: Episode.Info) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            </>
          ) : (
            <p>No episodes yet.</p>
          );
        }}
      </Await>
    </Suspense>
  );
};
