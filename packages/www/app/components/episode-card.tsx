import {
  CalendarIcon,
  ClockIcon,
  PersonIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { Episode } from "@sst-tanstack/core/episode/episode";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "~/components/ui/card";

export default function EpisodeCard(props: { episode: Episode.Info }) {
  const { episode } = props;

  const secondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  return (
    <Link
      to={`/episodes/${episode.youtubeId}`}
      className="block transition-opacity hover:opacity-80"
    >
      <Card className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative aspect-video">
          {/* TODO: image optimization */}
          <img
            src={`https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
            alt={episode.title}
            // fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{episode.datePublished}</span>
              {/* <span>{formatDate(episode.datePublished)}</span> */}
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-4 w-4" />
              <span>{secondsToTime(episode.durationSeconds)}</span>
            </div>
            <div className="col-span-2 flex items-start space-x-2">
              <SewingPinFilledIcon className="mt-1 h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-2">{episode.venue}</span>
            </div>
            <div className="col-span-2 flex items-start space-x-2">
              <PersonIcon className="mt-1 h-4 w-4 flex-shrink-0" />
              {/* <span className="line-clamp-2">
                {guests.length > 0
                  ? guests.map((guest) => guest.person.name).join(", ")
                  : "No guests"}
              </span> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
