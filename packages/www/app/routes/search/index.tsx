import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { search, SearchParams, SearchOut } from "./-server";

export const Route = createFileRoute("/search/")({
  validateSearch: zodSearchValidator(SearchParams),
  beforeLoad: async (props) => {
    return { search: props.search };
  },
  loader: async ({ context }) => {
    return await search(context.search);
  },
  component: () => <Search />,
});

function Search() {
  const results = Route.useLoaderData();

  return (
    <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      <div className="flex flex-col items-center justify-center gap-2 max-w-screen-md">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-gray-500">
          Search for transcripts by keywords or phrases.
        </p>
        <ul className="flex flex-col gap-4">
          {results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SearchResultCard(props: { result: SearchOut }) {
  const { result } = props;
  return (
    <Card className="flex items-start gap-6 rounded-lg p-6 shadow-lg">
      <a
        target="_blank"
        href={`https://www.youtube.com/watch?v=${result.episode.youtubeId}&t=${result.startSecond}s`}
      >
        <CardContent className="max-w-full text-balance">
          <CardTitle>Episode {result.episode.id}</CardTitle>
          <p>{`"...${result.text}..."`}</p>
        </CardContent>
      </a>
    </Card>
  );
}
