<script setup lang="ts"></script>

<template>
  <div class="about">
    <h1 class="text-2xl font-bold text-blue-500">这是关于页面</h1>
  </div>
</template>

<style lang="postcss" scoped>
@media (min-width: 1024px) {
  .about {
    @apply min-h-full flex items-center;
  }
}
</style>
