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
      '/zh/wallet/': { base: '/zh/wallet/', items: sidebarwallet() }
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
      link: '/zh/dapplink/what-is-dapplink-docs',
      activeMatch: '/zh/dapplink/'
    },
    {
      text: '钱包',
      link: '/zh/wallet/overview',
      activeMatch: '/zh/wallet/'
    },
    {
      text: '公链',
      link: '/zh/dapplink/site-config',
      activeMatch: '/zh/wallet/'
    },
    {
      text: 'DA',
      link: '/zh/dapplink/site-config',
      activeMatch: '/zh/wallet/'
    },
    {
      text: '去中心化应用',
      link: '/zh/dapplink/site-config',
      activeMatch: '/zh/wallet/'
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
        { text: '什么是 DappLink ？', link: 'what-is-dapplink-docs' },
        { text: 'DappLink Layer3', link: 'dapplink-layer3' },
      ]
    },
    {
      text: '一键发钱包',
      collapsed: false,
      items: [
        { text: '什么是一键发钱包', link: 'what-is-dapplink-docs' },
      ]
    },
    {
      text: 'DappLink Layer3',
      collapsed: false,
      items: [
        { text: '什么是 DappLink Layer3', link: 'what-is-dapplink-docs' },
      ]
    },
    {
      text: '一键发公链',
      collapsed: false,
      items: [
        { text: '什么是一键发链', link: 'what-is-dapplink-docs' },
      ]
    },
    {
      text: '一键发 DA',
      collapsed: false,
      items: [
        { text: '什么是一键发 DA', link: 'what-is-dapplink-docs' },
      ]
    },
    {
      text: '一键发组合去中心化应用',
      collapsed: false,
      items: [
        { text: '什么是组合去中心化应用', link: 'what-is-dapplink-docs' },
      ]
    }
  ]
}

function sidebarwallet(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '一键发钱包',
      items: [
        { text: '钱包架构', link: 'overview' },
        { text: '钱包功能模块', link: 'dapplink-wallet' },
        {
          text: '项目组成',
          base: '/zh/dapplink/default-theme-',
          items: [
            { text: 'wallet-chain-node', link: 'config' },
            { text: 'sky-eye', link: 'nav' },
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
