import { TranscriptChunk } from '@sst-tanstack/core/transcript/transcript-chunk'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { search } from './-functions'

export const Route = createFileRoute('/search/')({
  loader: async () => {
    return await search({ query: 'sweet nothings in her ear' })
  },
  component: () => <Search />,
})

function Search() {
  const results = Route.useLoaderData()

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
  )
}

function SearchResultCard(props: { result: TranscriptChunk.SearchOut }) {
  const { result } = props
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
  )
}
