import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-12 px-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-yellow-400">Kill</span>{" "}
        <span className="text-red-600">Tony</span>
      </h1>

      <div className="flex gap-12">
        <Button variant="outline" asChild>
          <Link to="/episodes">Episodes</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/search">Search</Link>
        </Button>
      </div>
    </main>
  );
}
