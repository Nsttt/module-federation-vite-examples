import { federation } from "@module-federation/vite";
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  experimental: {
    buildCache: false,
  },

  routeRules: {
    "/**": { headers: { "Access-Control-Allow-Origin": "*" } },
  },

  hooks: {
    "nitro:build:public-assets"(nitro) {
      const clientDir = resolve(nitro.options.buildDir, "dist/client");
      const publicDir = nitro.options.output.publicDir;
      mkdirSync(publicDir, { recursive: true });

      for (const file of ["remoteEntry.js", "remoteEntry.ssr.js", "mf-manifest.json"]) {
        const src = resolve(clientDir, file);
        if (existsSync(src)) cpSync(src, resolve(publicDir, file));
      }
    },
  },

  vite: {
    server: {
      cors: true,
      hmr: { port: 24674 },
    },
    plugins: [
      federation({
        dts: false,
        name: "remote",
        filename: "remoteEntry.js",
        manifest: true,
        exposes: {
          "./remote-card": "./app/components/RemoteCard.vue",
        },
        shared: {
          vue: { singleton: true },
        },
      }) as any,
    ],
  },
});
