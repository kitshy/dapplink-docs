import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'dapplink-docs'

const require = createRequire(import.meta.url)
const pkg = require('dapplink-docs/package.json')

export const en = defineConfig({
  lang: 'en-US',
  description: 'DappLink Tech Docs',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/dapplink/': { base: '/dapplink/', items: sidebarDappLink() },
      '/wallet/': { base: '/wallet/', items: sidebarwallet() }
    },

    editLink: {
      pattern: 'https://github.com/dapplink-labs/dapplink-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'DappLink Developer Docs.',
      copyright: 'Copyright © 2024-present DappLink'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'DappLink',
      link: '/dapplink/what-is-dapplink-docs',
      activeMatch: '/dapplink/'
    },
    {
      text: 'Wallet',
      link: '/wallet/overview',
      activeMatch: '/wallet/'
    },
    {
      text: 'DA',
      link: '/dapplink/site-config',
      activeMatch: '/wallet/'
    },
    {
      text: 'L2 & L3',
      link: '/dapplink/site-config',
      activeMatch: '/wallet/'
    },
    {
      text: 'Dapps',
      link: '/dapplink/site-config',
      activeMatch: '/wallet/'
    },
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/dapplink-labs/dapplink-docs/blob/main/CHANGELOG.md'
        },
        {
          text: 'Contributing',
          link: 'https://github.com/dapplink-labs/dapplink-docs/blob/main/.github/contributing.md'
        }
      ]
    }
  ]
}

function sidebarDappLink(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is DappLink?', link: 'what-is-dapplink-docs' },
        { text: 'DappLink Layer3', link: 'dapplink-layer3' },
      ]
    },
    {
      text: 'xxxxx',
      collapsed: false,
      items: [
        { text: 'xxxx', link: 'xxxx' },
      ]
    }
  ]
}

function sidebarwallet(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'wallet',
      items: [
        { text: 'Overview', link: 'overview' },
        { text: 'DappLink Wallet', link: 'dapplink-wallet' },
        {
          text: 'Projects',
          base: '/dapplink/default-theme-',
          items: [
            { text: 'wallet-chain-node', link: 'config' }
          ]
        }
      ]
    }
  ]
}
