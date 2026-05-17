<script setup lang="ts">
import { onMounted, ref } from "vue";

const count = ref(0);
const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});
</script>

<template>
  <section
    :data-remote-card-hydrated="hydrated"
    style="
      background: #101412;
      box-shadow:
        0 0 0 1px rgba(0, 220, 130, 0.45) inset,
        0 18px 34px rgba(0, 0, 0, 0.28);
      border-radius: 5px;
      margin: 20px;
      width: 280px;
      padding: 20px;
      text-align: center;
      color: #eafff6;
      float: left;
    "
  >
    <div
      style="
        display: inline-block;
        background: #00dc82;
        border-radius: 999px;
        padding: 0.25rem 0.7rem;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #061b14;
      "
    >
      Nuxt Remote
    </div>
    <div style="margin-top: 14px; font-size: 34px; line-height: 1; font-weight: 900">SSR</div>
    <div style="margin-top: 10px; font-size: 24px; font-weight: 700">I'm the remote SSR app</div>
    <button
      style="
        border: 0 solid #e2e8f0;
        margin-top: 14px;
        background-color: #00dc82;
        border-radius: 0.25rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        color: #061b14;
      "
      @click="count++"
    >
      Remote counter: {{ count }}
    </button>
  </section>
</template>
