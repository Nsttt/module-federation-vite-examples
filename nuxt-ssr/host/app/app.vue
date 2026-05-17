<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { loadClientRemoteCard, loadServerRemoteCard } from "./utils/federation";

const count = ref(0);
const RemoteMFE = defineAsyncComponent(async () => {
  if (import.meta.server) {
    return loadServerRemoteCard();
  }

  return loadClientRemoteCard();
});
</script>

<template>
  <section
    style="
      background: linear-gradient(135deg, #00dc82 0%, #0f7b55 100%);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.22) inset,
        0 18px 34px rgba(0, 0, 0, 0.28);
      border-radius: 5px;
      margin: 20px;
      width: 280px;
      padding: 20px;
      text-align: center;
      color: #061b14;
      float: left;
    "
  >
    <div
      style="
        display: inline-block;
        background: rgba(255, 255, 255, 0.88);
        border-radius: 999px;
        padding: 0.25rem 0.7rem;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      "
    >
      Nuxt SSR
    </div>
    <div style="margin-top: 14px; font-size: 34px; line-height: 1; font-weight: 900">Host</div>
    <div style="margin-top: 10px; font-size: 24px; font-weight: 700">I'm the host SSR app</div>
    <button
      style="
        border: 0 solid #e2e8f0;
        margin-top: 14px;
        background-color: #10231c;
        border-radius: 0.25rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        color: #eafff6;
      "
      @click="count++"
    >
      Host counter: {{ count }}
    </button>
  </section>

  <Suspense>
    <RemoteMFE />
  </Suspense>
</template>
