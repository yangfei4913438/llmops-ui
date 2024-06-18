<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-3xl font-bold">{{ msg }}</h1>

    <h3 class="text-base text-gray-600">
      You’ve successfully created a project with Vite + Vue 3. What's next?
    </h3>
  </div>
</template>

<style scoped></style>
