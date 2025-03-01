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
      '/wallet/': { base: '/wallet/', items: sidebarWallet() }
    },

    editLink: {
      pattern:
        'https://github.com/dapplink-labs/dapplink-docs/edit/main/docs/:path',
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
      link: '/dapplink/what-is-dapplink',
      activeMatch: '/dapplink/'
    },
    {
      text: 'Wallet',
      link: '/wallet/overview',
      activeMatch: '/wallet/'
    },
    {
      text: 'Chain Abstract',
      link: '/chain/overview',
      activeMatch: '/chain/'
    },
    {
      text: 'Dapps',
      link: '/dapps/overview',
      activeMatch: '/dapps/'
    },
    {
      text: 'layer3',
      link: '/layer3/overview',
      activeMatch: '/layer3/'
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
        { text: 'What is DappLink ？', link: 'what-is-dapplink' },
        { text: 'DappLink Core Business', link: 'core-business' }
      ]
    },
    {
      text: 'One-Click Wallet Deployment',
      collapsed: false,
      items: [
        {
          text: 'What is One-Click Wallet Deployment ？',
          link: 'what-is-dapplink-wallet'
        }
      ]
    },
    {
      text: 'One-Click Chain Deployment',
      collapsed: false,
      items: [
        {
          text: 'What is One-Click L2&L3 Deployment ？',
          link: 'what-is-dapplink-chain'
        }
      ]
    },
    {
      text: 'One-Click Deployment of Decentralized Composite Applications',
      collapsed: false,
      items: [
        {
          text: 'What are Decentralized Composite Applications ？',
          link: 'what-is-dapplink-dapps'
        }
      ]
    },
    {
      text: 'DappLink Layer3',
      collapsed: false,
      items: [
        { text: 'What is DappLink Layer3 ？', link: 'what-is-dapplink-layer3' }
      ]
    },
  ]
}

function sidebarWallet(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'One-Click Wallet Deployment',
      items: [
        { text: 'System Architecture', link: 'system-architecture' },
        { text: 'Core Function', link: 'dapplink-wallet' },
        {
          text: 'Project Components',
          base: '/wallet/',
          items: [
            {
              text: 'Unified Browser API Code Library',
              link: 'chain-explorer-api'
            },
            {
              text: 'Unified RPC Interface Service',
              link: 'wallet-chain-node'
            },
            { text: 'Key Management Tool', link: 'key-locker' },
            {
              text: 'Underlying Library for Threshold Secret Sharing Algorithms',
              link: 'dapplink-secret'
            },
            { text: 'Market Aggregator', link: 'skyeye' },
            { text: 'Trade System', link: 'trade' },
            { text: 'Offline Sign SDK', link: 'wallet-sdk' },
            { text: 'MPC Network', link: 'tss' },
            { text: 'Cross-Chain Staking Project', link: 'linklayer' },
            { text: 'HD Wallet Backend Service', link: 'hailstone' },
            {
              text: 'Unified Wallet Services for Deposit, Withdrawal, Aggregation, Cold Transfer, and Risk Control',
              link: 'wallet-scanner'
            },
            {
              text: 'Centralized Wallet Business Components',
              link: 'centralized-wallet-servicer'
            }
          ]
        }
      ]
    }
  ]
}
