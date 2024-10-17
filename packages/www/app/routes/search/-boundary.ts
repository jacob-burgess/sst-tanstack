/**
 * Maybe call the file -boundary.ts ?
 *
 * This pattern makes it very explicit where your server/client boundary is.
 *
 * The idea being -
 *
 * while coding in the `core` package, you are a backend dev. Don't worry too much
 * about the boundary. You're explicitly on the backend. That's not your job.
 *
 * Additionally, while coding in the `app` package, you are a frontend dev. Don't worry
 * too much about nothing. I mean, its just frontend.
 *
 * EXCEPT! for `-boundary.ts` files (the '-' just tells tanstack that this is not a routetree file).
 *
 * The only place you're 'allowed' to import from `@app/core` is in a boundary file, because
 * boundary files are also server code! If you need code from the core package in other files
 * in the app (like, maybe, some shared schemas), you can re-export the code from the boundary file.
 *
 * how does this affect bundles? does code splitting save us here?
 *
 * idk just a thought.
 */
