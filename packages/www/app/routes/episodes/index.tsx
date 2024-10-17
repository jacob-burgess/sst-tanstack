import { createFileRoute } from "@tanstack/react-router";
import EpisodeCard from "~/components/episode-card";
import { listEpisodes } from "./-functions";

export const Route = createFileRoute("/episodes/")({
  loader: async () => {
    return await listEpisodes({ limit: 9, offset: 0 });
  },
  component: EpisodesPage,
});

function EpisodesPage() {
  const episodes = Route.useLoaderData();

  return (
    <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-yellow-400">Kill</span>{" "}
        <span className="text-red-600">Tony</span>
      </h1>
      {episodes?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p>No episodes yet.</p>
      )}
    </section>
  );
}
