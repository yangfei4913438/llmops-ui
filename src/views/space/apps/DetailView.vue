<script setup lang="ts">
import { useRouter } from 'vue-router'
import { del, get, post, put } from '@/utils/request'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const app_id = 'fa2ae221-09eb-4808-b18d-dd524be6b98d'

const debugPost = async () => {
  console.log('对话数据')
  await post(`/apps/${app_id}/debug`, { query: '你好' }).then((res) => {
    console.log(res)
  })
}

const debugGet = async () => {
  console.log('获取数据')
  await get(`/app/${app_id}`).then((res) => {
    console.log(res)
  })
}

const debugCreate = async () => {
  console.log('创建数据')
  await post('/app').then((res) => {
    console.log(res)
  })
}

const debugPut = async () => {
  console.log('更新数据')
  await put(`/app/${app_id}`).then((res) => {
    console.log(res)
  })
}

const debugDelete = async () => {
  console.log('删除数据')
  await del(`/app/${app_id}`).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-xl font-bold">这里是 AI 应用详情</h1>
    <div class="flex space-x-2">
      <a-button type="primary" @click="debugPost">POST对话数据</a-button>
      <a-button type="primary" @click="debugGet">GET获取数据</a-button>
      <a-button type="primary" @click="debugCreate">POST创建数据</a-button>
      <a-button type="primary" @click="debugPut">PUT更新数据</a-button>
      <a-button type="primary" @click="debugDelete">DELETE删除数据</a-button>
    </div>

    <div class="mt-4">
      <router-link to="-1">
        <a-button type="primary" @click="goBack">返回</a-button>
      </router-link>
    </div>
  </section>
</template>

<style scoped></style>
