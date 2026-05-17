import { federation } from "@module-federation/vite";
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const isDev = process.env.NODE_ENV !== "production";
const remoteBase = isDev ? "/_nuxt" : "";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  experimental: {
    buildCache: false,
  },

  hooks: {
    "nitro:build:public-assets"(nitro) {
      const clientDir = resolve(nitro.options.buildDir, "dist/client");
      const publicDir = nitro.options.output.publicDir;
      mkdirSync(publicDir, { recursive: true });

      const src = resolve(clientDir, "remoteEntry.js");
      if (existsSync(src)) cpSync(src, resolve(publicDir, "remoteEntry.js"));
    },
  },

  vite: {
    server: {
      hmr: { port: 24673 },
    },
    plugins: [
      federation({
        dts: false,
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          remote: {
            type: "module",
            name: "remote",
            entry: `http://localhost:4274${remoteBase}/remoteEntry.js`,
            entryGlobalName: "remote",
            shareScope: "default",
          },
        },
        exposes: {},
        shared: {
          vue: { singleton: true },
        },
      }) as any,
    ],
  },
});
