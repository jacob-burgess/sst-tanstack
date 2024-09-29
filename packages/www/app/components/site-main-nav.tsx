"use client";

import { Link } from "@tanstack/react-router";

export function SiteMainNav() {
  return (
    <div className="mr-4 flex">
      <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <p className="text-xl font-bold lg:inline-block">
          <span className="text-yellow-300">kill</span>
          <span className="text-red-600">tony</span>
          .fyi
        </p>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavItem to="/episodes">Episodes</NavItem>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/streaming">Streaming example</NavItem>
        {/* <NavItem to="/comedians">Comedians</NavItem> */}
      </nav>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="transition-colors hover:text-foreground/80"
      activeProps={{ className: "text-foreground" }}
      inactiveProps={{ className: "text-foreground/60" }}
    >
      {children}
    </Link>
  );
}
