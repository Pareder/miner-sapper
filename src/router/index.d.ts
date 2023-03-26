export {}

import 'vue-router'

interface MetaTag {
  name: string
  content: string
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    metaTags: Array<MetaTag>
  }
}