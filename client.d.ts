// re-export vite client types. with strict installers like pnpm, user won't
// be able to dapplink vite/client in project root.
/// <dapplink types="vite/client" />

export * from './dist/client/index.js'
