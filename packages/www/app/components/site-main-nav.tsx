"use client";

import { Link } from "@tanstack/react-router";

export function SiteMainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <p className="hidden text-xl font-bold lg:inline-block">
          <span className="text-yellow-300">kill</span>
          <span className="text-red-600">tony</span>
          .fyi
        </p>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link to="/episodes" activeOptions={{ exact: true }}>
          Episodes
        </Link>
        <Link to="/search" activeOptions={{ exact: true }}>
          Search
        </Link>
        {/* <Link to="/comedians" activeOptions={{ exact: true }}>
          Comedians
        </Link> */}
      </nav>
    </div>
  );
}
