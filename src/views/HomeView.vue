<script setup lang="ts">
import { useAccountStore } from '@/stores/account'

const store = useAccountStore()

const updateAccount = () => {
  store.updateAccount({ name: '张三' })
}

const resetAccount = () => {
  store.resetAccount()
}
</script>

<template>
  <main class="space-y-4">
    <header class="flex flex-col space-x-4 space-y-4 border-b pb-4">
      <nav class="space-x-2">
        <router-link to="/">
          <a-button type="primary">主页</a-button>
        </router-link>
        <router-link to="/about">
          <a-button type="primary">关于</a-button>
        </router-link>
      </nav>
    </header>

    <h1 class="text-2xl font-bold">这是主页</h1>
    <p>当前登录的用户: {{ store.showName }}</p>
    <p>当前用户的邮箱: {{ store.account.email }}</p>
    <div class="space-x-2">
      <a-button type="primary" @click="updateAccount">更新用户名</a-button>
      <a-button type="secondary" @click="resetAccount">重置用户名</a-button>
    </div>
    <div class="mt-4">
      <router-link to="/space/apps">
        <a-button type="primary"> 跳转到应用列表</a-button>
      </router-link>
    </div>
  </main>
</template>
