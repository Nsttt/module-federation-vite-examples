import * as Vue from "vue";
import {
  createFederationInstance,
  createServerFederationInstance,
  loadRemoteFromManifest,
} from "@module-federation/vite/runtime";

const REMOTE_MANIFEST_URL =
  (import.meta.server ? process.env.NUXT_REMOTE_MANIFEST_URL : undefined) ||
  `http://localhost:4274${import.meta.dev ? "/_nuxt" : ""}/mf-manifest.json`;
const SERVER_RUNTIME_KEY = Symbol.for("module-federation.nuxt-ssr-host.server-runtime");
const CLIENT_RUNTIME_KEY = Symbol.for("module-federation.nuxt-ssr-host.client-runtime");

function getSharedVue() {
  return {
    vue: {
      version: Vue.version,
      lib: () => Vue,
      shareConfig: {
        singleton: true,
        requiredVersion: false,
      },
    },
  };
}

export async function loadServerRemoteCard() {
  if (!(globalThis as Record<symbol, boolean>)[SERVER_RUNTIME_KEY]) {
    createServerFederationInstance({
      name: "nuxt_ssr_host_server",
      remotes: [],
      shared: getSharedVue(),
      shareStrategy: "loaded-first",
    });
    (globalThis as Record<symbol, boolean>)[SERVER_RUNTIME_KEY] = true;
  }

  const mod = await loadRemoteFromManifest("remote/remote-card", REMOTE_MANIFEST_URL, {
    target: "node",
  });
  return (mod as any).default || mod;
}

export async function loadClientRemoteCard() {
  if (!(globalThis as Record<symbol, boolean>)[CLIENT_RUNTIME_KEY]) {
    createFederationInstance({
      name: "nuxt_ssr_host_client",
      remotes: [],
      shared: getSharedVue(),
      shareStrategy: "loaded-first",
    });
    (globalThis as Record<symbol, boolean>)[CLIENT_RUNTIME_KEY] = true;
  }

  const mod = await loadRemoteFromManifest("remote/remote-card", REMOTE_MANIFEST_URL, {
    target: "web",
  });
  return (mod as any).default || mod;
}
