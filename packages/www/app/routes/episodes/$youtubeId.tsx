import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Episode } from "@sst-tanstack/core/episode/episode";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { formatDuration } from "~/lib/utils/format";

const episodeByYoutubeId = createServerFn("GET", async (youtubeId: string) => {
  return Episode.byYoutubeId(youtubeId);
});

export const Route = createFileRoute("/episodes/$youtubeId")({
  loader: async ({ params }) => {
    console.log("params", params);
    const episode = await episodeByYoutubeId(params.youtubeId);
    return { episode };
  },
  component: EpisodePage,
});

function EpisodePage() {
  const { episode } = Route.useLoaderData();

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <Link to="/episodes">
        <p className="text-sm pb-2 underline">back to episodes</p>
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-video w-full">
          {/* TODO: image optimization */}
          <img
            src={`https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
            alt={episode.title}
            // fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-between lg:h-full">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
            {episode.title}
          </h1>
          <div className="flex items-center space-x-4 py-2 pb-4 text-center">
            <div className="flex items-center text-xs text-gray-500 sm:text-sm">
              <span>
                {new Date(episode.datePublished).toLocaleDateString()}
              </span>
              <span className="mx-2 sm:inline">•</span>
              <span>{formatDuration(episode.durationSeconds)}</span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
              title="Watch on YouTube"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
          <p className="mb-4 text-sm text-gray-600 sm:text-base lg:line-clamp-[6] xl:line-clamp-[8]">
            {episode.description}
          </p>
        </div>
      </div>
    </section>
  );
}
