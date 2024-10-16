import type { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { DevTools } from "~/components/dev-tools";
import { NotFound } from "~/components/not-found";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { siteConfig } from "~/lib/config/site";
import { cn } from "~/lib/utils/cn";
import { seo } from "~/lib/utils/seo";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    ...seo({
      title: siteConfig.title,
      description: siteConfig.description,
      image: siteConfig.ogImage,
      keywords: siteConfig.keywords.join(","),
    }),
  ],
  links: () => [
    { rel: "stylesheet", href: appCss },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
    { rel: "icon", href: "/favicon.ico" },
  ],
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body className={cn("min-h-screen font-sans antialiased")}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <hr />
          <main className="flex-1">{children}</main>
          <hr />
          <SiteFooter />
        </div>
        <ScrollRestoration />
        <DevTools />
        <Scripts />
      </Body>
    </Html>
  );
}
