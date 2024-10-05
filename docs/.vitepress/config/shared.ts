import { defineConfig } from 'dapplink-docs'
import { search as zhSearch } from './zh'

export const shared = defineConfig({
  title: 'TECH DOCS',

  rewrites: {
    'en/:rest*': ':rest*'
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ]
  },

  sitemap: {
    hostname: 'https://docs.dapplink.xyz',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/dapplink-docs-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/dapplink-docs-logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'DappLink | Vite & Vue Powered Static Site Generator' }],
    ['meta', { property: 'og:site_name', content: 'DappLink' }],
    ['meta', { property: 'og:image', content: 'https://DappLink.dev/DappLink-og.jpg' }],
    ['meta', { property: 'og:url', content: 'https://DappLink.dev/' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],

  themeConfig: {
    logo: { src: '/dapplink_logo_hei.png', width: 136, height: 42 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dapplink-labs' }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: '',
        apiKey: '',
        indexName: 'DappLink',
        locales: {
          ...zhSearch
        }
      }
    },

    carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' }
  }
})
