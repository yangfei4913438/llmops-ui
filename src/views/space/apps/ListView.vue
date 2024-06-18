<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
</script>

<template>
  <main class="space-y-4">
    <h1 class="text-2xl font-bold">这里是 AI 应用列表</h1>
    <p>数值: {{ store.count }}</p>
    <p>双倍数值: {{ store.doubleCount }}</p>
    <a-button type="primary" @click="store.increment">数值+1</a-button>
    <div class="mt-4 space-x-2">
      <router-link to="/space/apps/fa2ae221-09eb-4808-b18d-dd524be6b98d">
        <a-button type="primary">跳转到应用详情页</a-button>
      </router-link>
      <router-link to="/space/app/fa2ae221-09eb-4808-b18d-dd524be6b98d">
        <a-button type="primary">跳转到对话窗口</a-button>
      </router-link>
    </div>
  </main>
</template>

<style scoped></style>
