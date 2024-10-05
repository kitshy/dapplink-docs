import { setupDevToolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import type { Router } from './router'
import type { DappLinkData } from './data'

const COMPONENT_STATE_TYPE = 'DappLink'

export const setupDevtools = (
  app: App,
  router: Router,
  data: DappLinkData
): void => {
  setupDevToolsPlugin(
    {
      // fix recursive dapplink
      app: app as any,
      id: 'org.vuejs.dapplink-docs',
      label: 'DappLink',
      packageName: 'dapplink-docs',
      homepage: 'https://vitepress.dev',
      componentStateTypes: [COMPONENT_STATE_TYPE]
    },
    (api) => {
      // TODO: remove any
      api.on.inspectComponent((payload: any) => {
        payload.instanceData.state.push({
          type: COMPONENT_STATE_TYPE,
          key: 'route',
          value: router.route,
          editable: false
        })

        payload.instanceData.state.push({
          type: COMPONENT_STATE_TYPE,
          key: 'data',
          value: data,
          editable: false
        })
      })
    }
  )
}
