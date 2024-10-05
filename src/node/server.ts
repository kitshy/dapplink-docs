import { createServer as createViteServer, type ServerOptions } from 'vite'
import { resolveConfig } from './config'
import { createDappLinkPlugin } from './plugin'

export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions & { base?: string } = {},
  recreateServer?: () => Promise<void>
) {
  const config = await resolveConfig(root)

  if (serverOptions.base) {
    config.site.base = serverOptions.base
    delete serverOptions.base
  }

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    cacheDir: config.cacheDir,
    plugins: await createDappLinkPlugin(config, false, {}, {}, recreateServer),
    server: serverOptions,
    customLogger: config.logger,
    configFile: config.vite?.configFile
  })
}
