import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'dapplink-docs'

const require = createRequire(import.meta.url)
const pkg = require('dapplink-docs/package.json')

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: 'DappLink 技术文档',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/dapplink/': { base: '/zh/dapplink/', items: sidebarDappLink() },
      '/zh/wallet/': { base: '/zh/wallet/', items: sidebarWallet() }
    },

    editLink: {
      pattern: 'https://github.com/dapplink-labs/dapplink-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: 'DappLink 开发者',
      copyright: `版权所有 © 2024-${new Date().getFullYear()} DappLink`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'DappLink',
      link: '/zh/dapplink/what-is-dapplink',
      activeMatch: '/zh/dapplink/'
    },
    {
      text: '钱包',
      link: '/zh/wallet/overview',
      activeMatch: '/zh/wallet/'
    },
    {
      text: '链抽象',
      link: '/zh/chain/overview',
      activeMatch: '/zh/chain/'
    },
    {
      text: '去中心化应用',
      link: '/zh/dapps/overview',
      activeMatch: '/zh/dapps/'
    },
    {
      text: 'Layer3',
      link: '/zh/layer3/overview',
      activeMatch: '/zh/layer3/'
    },
    {
      text: pkg.version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/dapplink-labs/dapplink-docs/blob/main/CHANGELOG.md'
        },
        {
          text: '参与贡献',
          link: 'https://github.com/dapplink-labs/dapplink-docs/blob/main/.github/contributing.md'
        }
      ]
    }
  ]
}

function sidebarDappLink(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: 'DappLink 是什么', link: 'what-is-dapplink' },
        { text: 'DappLink 核心业务', link: 'core-business' },
      ]
    },
    {
      text: '一键发钱包',
      collapsed: false,
      items: [
        { text: '什么是一键发钱包', link: 'what-is-dapplink-wallet' },
      ]
    },
    {
      text: '一键发公链',
      collapsed: false,
      items: [
        { text: '一键发链是什么', link: 'what-is-dapplink-chain' },
      ]
    },
    {
      text: '一键发去中心化组合应用',
      collapsed: false,
      items: [
        { text: '去中心化组合应用是什么', link: 'what-is-dapplink-dapps' },
      ]
    },
    {
      text: 'DappLink Layer3',
      collapsed: false,
      items: [
        { text: 'DappLink Layer3 是什么', link: 'what-is-dapplink-layer3' },
      ]
    },
  ]
}

function sidebarWallet(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '一键发钱包',
      items: [
        { text: '系统架构', link: 'overview' },
        { text: '核心功能模块', link: 'dapplink-wallet' },
        {
          text: '项目组件',
          base: '/zh/wallet/',
          items: [
            { text: '统一浏览器代码库', link: 'chain-explorer-api' },
            { text: '统一 RPC 接口服务', link: 'wallet-chain-node' },
            { text: '密钥托管工具', link: 'key-locker' },
            { text: '门限共享秘密算法的底层库', link: 'dapplink-secret' },
            { text: '行情聚合器物', link: 'skyeye' },
            { text: '交易系统', link: 'trade' },
            { text: '离线签名 SDK', link: 'wallet-sdk' },
            { text: 'MPC 网络', link: 'tss' },
            { text: '跨链质押项目', link: 'linklayer' },
            { text: 'HD 钱包后端服务服务', link: 'hailstone' },
            { text: '统一充值，提现，归集，转冷，风控的钱包服务', link: 'wallet-scanner' },
            { text: '中心化钱包业务组件', link: 'centralized-wallet-servicer' }
          ]
        }
      ]
    }
  ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
