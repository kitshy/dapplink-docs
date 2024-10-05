// exports in this file are exposed to themes and md files via 'dapplink-docs'
// so the user can do `import { useRoute, useData } from 'dapplink-docs'`

// generic types
export type { DappLinkData } from './app/data'
export type { Route, Router } from './app/router'

// theme types
export type { EnhanceAppContext, Theme } from './app/theme'

// shared types
export type { HeadConfig, Header, PageData, SiteData } from '../../types/shared'

// composables
export { useData, dataSymbol } from './app/data'
export { useRoute, useRouter } from './app/router'

// utilities
export {
  inBrowser,
  onContentUpdated,
  defineClientComponent,
  withBase,
  getScrollOffset,
  _escapeHtml
} from './app/utils'

// components
export { Content } from './app/components/Content'
