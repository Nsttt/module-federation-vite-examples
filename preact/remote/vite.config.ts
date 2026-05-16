import { federation } from "@module-federation/vite";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
  server: {
    fs: {
      allow: [".", "..", "../shared"],
    },
  },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      dts: false,
      dev: { disableDynamicRemoteTypeHints: true, remoteHmr: true },
      filename: "remoteEntry.js",
      name: "remote",
      exposes: {
        "./remote-app": "./src/app.tsx",
      },
      remotes: {},
      shared: {
        preact: {
          requiredVersion: dependencies.preact,
          singleton: true,
        },
        "preact/hooks": {
          requiredVersion: dependencies.preact,
          singleton: true,
        },
      },
    }),
    preact({ prefreshEnabled: false }),
  ],
}));
