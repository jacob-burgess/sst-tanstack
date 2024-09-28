/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RedirectImport } from './routes/redirect'
import { Route as PostsImport } from './routes/posts'
import { Route as DeferredImport } from './routes/deferred'
import { Route as LayoutImport } from './routes/_layout'
import { Route as SearchRouteImport } from './routes/search/route'
import { Route as EpisodesRouteImport } from './routes/episodes/route'
import { Route as IndexImport } from './routes/index'
import { Route as SearchIndexImport } from './routes/search/index'
import { Route as PostsIndexImport } from './routes/posts.index'
import { Route as EpisodesIndexImport } from './routes/episodes/index'
import { Route as PostsPostIdImport } from './routes/posts.$postId'
import { Route as LayoutLayout2Import } from './routes/_layout/_layout-2'
import { Route as PostsPostIdDeepImport } from './routes/posts_.$postId.deep'
import { Route as LayoutLayout2LayoutBImport } from './routes/_layout/_layout-2/layout-b'
import { Route as LayoutLayout2LayoutAImport } from './routes/_layout/_layout-2/layout-a'

// Create/Update Routes

const RedirectRoute = RedirectImport.update({
  path: '/redirect',
  getParentRoute: () => rootRoute,
} as any)

const PostsRoute = PostsImport.update({
  path: '/posts',
  getParentRoute: () => rootRoute,
} as any)

const DeferredRoute = DeferredImport.update({
  path: '/deferred',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const SearchRouteRoute = SearchRouteImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const EpisodesRouteRoute = EpisodesRouteImport.update({
  path: '/episodes',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SearchIndexRoute = SearchIndexImport.update({
  path: '/',
  getParentRoute: () => SearchRouteRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  path: '/',
  getParentRoute: () => PostsRoute,
} as any)

const EpisodesIndexRoute = EpisodesIndexImport.update({
  path: '/',
  getParentRoute: () => EpisodesRouteRoute,
} as any)

const PostsPostIdRoute = PostsPostIdImport.update({
  path: '/$postId',
  getParentRoute: () => PostsRoute,
} as any)

const LayoutLayout2Route = LayoutLayout2Import.update({
  id: '/_layout-2',
  getParentRoute: () => LayoutRoute,
} as any)

const PostsPostIdDeepRoute = PostsPostIdDeepImport.update({
  path: '/posts/$postId/deep',
  getParentRoute: () => rootRoute,
} as any)

const LayoutLayout2LayoutBRoute = LayoutLayout2LayoutBImport.update({
  path: '/layout-b',
  getParentRoute: () => LayoutLayout2Route,
} as any)

const LayoutLayout2LayoutARoute = LayoutLayout2LayoutAImport.update({
  path: '/layout-a',
  getParentRoute: () => LayoutLayout2Route,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/episodes': {
      id: '/episodes'
      path: '/episodes'
      fullPath: '/episodes'
      preLoaderRoute: typeof EpisodesRouteImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchRouteImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/deferred': {
      id: '/deferred'
      path: '/deferred'
      fullPath: '/deferred'
      preLoaderRoute: typeof DeferredImport
      parentRoute: typeof rootRoute
    }
    '/posts': {
      id: '/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsImport
      parentRoute: typeof rootRoute
    }
    '/redirect': {
      id: '/redirect'
      path: '/redirect'
      fullPath: '/redirect'
      preLoaderRoute: typeof RedirectImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_layout-2': {
      id: '/_layout/_layout-2'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutLayout2Import
      parentRoute: typeof LayoutImport
    }
    '/posts/$postId': {
      id: '/posts/$postId'
      path: '/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof PostsPostIdImport
      parentRoute: typeof PostsImport
    }
    '/episodes/': {
      id: '/episodes/'
      path: '/'
      fullPath: '/episodes/'
      preLoaderRoute: typeof EpisodesIndexImport
      parentRoute: typeof EpisodesRouteImport
    }
    '/posts/': {
      id: '/posts/'
      path: '/'
      fullPath: '/posts/'
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof PostsImport
    }
    '/search/': {
      id: '/search/'
      path: '/'
      fullPath: '/search/'
      preLoaderRoute: typeof SearchIndexImport
      parentRoute: typeof SearchRouteImport
    }
    '/_layout/_layout-2/layout-a': {
      id: '/_layout/_layout-2/layout-a'
      path: '/layout-a'
      fullPath: '/layout-a'
      preLoaderRoute: typeof LayoutLayout2LayoutAImport
      parentRoute: typeof LayoutLayout2Import
    }
    '/_layout/_layout-2/layout-b': {
      id: '/_layout/_layout-2/layout-b'
      path: '/layout-b'
      fullPath: '/layout-b'
      preLoaderRoute: typeof LayoutLayout2LayoutBImport
      parentRoute: typeof LayoutLayout2Import
    }
    '/posts/$postId/deep': {
      id: '/posts/$postId/deep'
      path: '/posts/$postId/deep'
      fullPath: '/posts/$postId/deep'
      preLoaderRoute: typeof PostsPostIdDeepImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface EpisodesRouteRouteChildren {
  EpisodesIndexRoute: typeof EpisodesIndexRoute
}

const EpisodesRouteRouteChildren: EpisodesRouteRouteChildren = {
  EpisodesIndexRoute: EpisodesIndexRoute,
}

const EpisodesRouteRouteWithChildren = EpisodesRouteRoute._addFileChildren(
  EpisodesRouteRouteChildren,
)

interface SearchRouteRouteChildren {
  SearchIndexRoute: typeof SearchIndexRoute
}

const SearchRouteRouteChildren: SearchRouteRouteChildren = {
  SearchIndexRoute: SearchIndexRoute,
}

const SearchRouteRouteWithChildren = SearchRouteRoute._addFileChildren(
  SearchRouteRouteChildren,
)

interface LayoutLayout2RouteChildren {
  LayoutLayout2LayoutARoute: typeof LayoutLayout2LayoutARoute
  LayoutLayout2LayoutBRoute: typeof LayoutLayout2LayoutBRoute
}

const LayoutLayout2RouteChildren: LayoutLayout2RouteChildren = {
  LayoutLayout2LayoutARoute: LayoutLayout2LayoutARoute,
  LayoutLayout2LayoutBRoute: LayoutLayout2LayoutBRoute,
}

const LayoutLayout2RouteWithChildren = LayoutLayout2Route._addFileChildren(
  LayoutLayout2RouteChildren,
)

interface LayoutRouteChildren {
  LayoutLayout2Route: typeof LayoutLayout2RouteWithChildren
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutLayout2Route: LayoutLayout2RouteWithChildren,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

interface PostsRouteChildren {
  PostsPostIdRoute: typeof PostsPostIdRoute
  PostsIndexRoute: typeof PostsIndexRoute
}

const PostsRouteChildren: PostsRouteChildren = {
  PostsPostIdRoute: PostsPostIdRoute,
  PostsIndexRoute: PostsIndexRoute,
}

const PostsRouteWithChildren = PostsRoute._addFileChildren(PostsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/episodes': typeof EpisodesRouteRouteWithChildren
  '/search': typeof SearchRouteRouteWithChildren
  '': typeof LayoutLayout2RouteWithChildren
  '/deferred': typeof DeferredRoute
  '/posts': typeof PostsRouteWithChildren
  '/redirect': typeof RedirectRoute
  '/posts/$postId': typeof PostsPostIdRoute
  '/episodes/': typeof EpisodesIndexRoute
  '/posts/': typeof PostsIndexRoute
  '/search/': typeof SearchIndexRoute
  '/layout-a': typeof LayoutLayout2LayoutARoute
  '/layout-b': typeof LayoutLayout2LayoutBRoute
  '/posts/$postId/deep': typeof PostsPostIdDeepRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutLayout2RouteWithChildren
  '/deferred': typeof DeferredRoute
  '/redirect': typeof RedirectRoute
  '/posts/$postId': typeof PostsPostIdRoute
  '/episodes': typeof EpisodesIndexRoute
  '/posts': typeof PostsIndexRoute
  '/search': typeof SearchIndexRoute
  '/layout-a': typeof LayoutLayout2LayoutARoute
  '/layout-b': typeof LayoutLayout2LayoutBRoute
  '/posts/$postId/deep': typeof PostsPostIdDeepRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/episodes': typeof EpisodesRouteRouteWithChildren
  '/search': typeof SearchRouteRouteWithChildren
  '/_layout': typeof LayoutRouteWithChildren
  '/deferred': typeof DeferredRoute
  '/posts': typeof PostsRouteWithChildren
  '/redirect': typeof RedirectRoute
  '/_layout/_layout-2': typeof LayoutLayout2RouteWithChildren
  '/posts/$postId': typeof PostsPostIdRoute
  '/episodes/': typeof EpisodesIndexRoute
  '/posts/': typeof PostsIndexRoute
  '/search/': typeof SearchIndexRoute
  '/_layout/_layout-2/layout-a': typeof LayoutLayout2LayoutARoute
  '/_layout/_layout-2/layout-b': typeof LayoutLayout2LayoutBRoute
  '/posts/$postId/deep': typeof PostsPostIdDeepRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/episodes'
    | '/search'
    | ''
    | '/deferred'
    | '/posts'
    | '/redirect'
    | '/posts/$postId'
    | '/episodes/'
    | '/posts/'
    | '/search/'
    | '/layout-a'
    | '/layout-b'
    | '/posts/$postId/deep'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/deferred'
    | '/redirect'
    | '/posts/$postId'
    | '/episodes'
    | '/posts'
    | '/search'
    | '/layout-a'
    | '/layout-b'
    | '/posts/$postId/deep'
  id:
    | '__root__'
    | '/'
    | '/episodes'
    | '/search'
    | '/_layout'
    | '/deferred'
    | '/posts'
    | '/redirect'
    | '/_layout/_layout-2'
    | '/posts/$postId'
    | '/episodes/'
    | '/posts/'
    | '/search/'
    | '/_layout/_layout-2/layout-a'
    | '/_layout/_layout-2/layout-b'
    | '/posts/$postId/deep'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EpisodesRouteRoute: typeof EpisodesRouteRouteWithChildren
  SearchRouteRoute: typeof SearchRouteRouteWithChildren
  LayoutRoute: typeof LayoutRouteWithChildren
  DeferredRoute: typeof DeferredRoute
  PostsRoute: typeof PostsRouteWithChildren
  RedirectRoute: typeof RedirectRoute
  PostsPostIdDeepRoute: typeof PostsPostIdDeepRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EpisodesRouteRoute: EpisodesRouteRouteWithChildren,
  SearchRouteRoute: SearchRouteRouteWithChildren,
  LayoutRoute: LayoutRouteWithChildren,
  DeferredRoute: DeferredRoute,
  PostsRoute: PostsRouteWithChildren,
  RedirectRoute: RedirectRoute,
  PostsPostIdDeepRoute: PostsPostIdDeepRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/episodes",
        "/search",
        "/_layout",
        "/deferred",
        "/posts",
        "/redirect",
        "/posts/$postId/deep"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/episodes": {
      "filePath": "episodes/route.tsx",
      "children": [
        "/episodes/"
      ]
    },
    "/search": {
      "filePath": "search/route.tsx",
      "children": [
        "/search/"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_layout-2"
      ]
    },
    "/deferred": {
      "filePath": "deferred.tsx"
    },
    "/posts": {
      "filePath": "posts.tsx",
      "children": [
        "/posts/$postId",
        "/posts/"
      ]
    },
    "/redirect": {
      "filePath": "redirect.tsx"
    },
    "/_layout/_layout-2": {
      "filePath": "_layout/_layout-2.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_layout-2/layout-a",
        "/_layout/_layout-2/layout-b"
      ]
    },
    "/posts/$postId": {
      "filePath": "posts.$postId.tsx",
      "parent": "/posts"
    },
    "/episodes/": {
      "filePath": "episodes/index.tsx",
      "parent": "/episodes"
    },
    "/posts/": {
      "filePath": "posts.index.tsx",
      "parent": "/posts"
    },
    "/search/": {
      "filePath": "search/index.tsx",
      "parent": "/search"
    },
    "/_layout/_layout-2/layout-a": {
      "filePath": "_layout/_layout-2/layout-a.tsx",
      "parent": "/_layout/_layout-2"
    },
    "/_layout/_layout-2/layout-b": {
      "filePath": "_layout/_layout-2/layout-b.tsx",
      "parent": "/_layout/_layout-2"
    },
    "/posts/$postId/deep": {
      "filePath": "posts_.$postId.deep.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
