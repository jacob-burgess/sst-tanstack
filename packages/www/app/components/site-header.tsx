import { SiteMainNav } from "~/components/site-main-nav";
import { SiteMobileNav } from "~/components/site-mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="hidden md:block">
          <SiteMainNav />
        </div>
        <div className="block md:hidden">
          <SiteMobileNav />
        </div>
      </div>
    </header>
  );
}
