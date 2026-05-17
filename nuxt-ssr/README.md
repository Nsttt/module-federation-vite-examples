# Nuxt SSR

This example renders a federated Vue component during Nuxt SSR.

The remote emits `remoteEntry.js`, `remoteEntry.ssr.js`, and `mf-manifest.json`.
The host uses `@module-federation/vite/runtime` on the server:

```ts
await loadRemoteFromManifest("remote/remote-card", remoteManifestUrl, {
  target: "node",
});
```

Run it:

```bash
pnpm nuxt-ssr:build
pnpm nuxt-ssr:preview
```
