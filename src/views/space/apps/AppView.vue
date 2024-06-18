<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { appDebugService } from '@/services/app'

// 路由
const { params } = useRoute()

// 交互数据
const query = ref('')
const loading = ref(false)
const messages = ref<{ role: 'human' | 'ai'; content: string }[]>([])

// 输入框变化
const handleChange = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement
  if (!textarea.value.trim()) {
    query.value = ''
    return
  }
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

// 清除聊天历史记录
const clearHistory = () => {
  messages.value = []
}

// 发送消息
const sendMessage = async () => {
  if (!query.value.trim()) {
    Message.error('请输入消息内容')
    return
  }
  // 如果正在加载中，则不发送消息
  if (loading.value) {
    Message.warning('正在回复中，请稍后。')
    return
  }
  try {
    // 提取消息内容
    const humanQuery = query.value.trim()
    messages.value.push({
      role: 'human',
      content: humanQuery,
    })
    // 清空输入框
    query.value = ''
    // 修改 loading 状态
    loading.value = true
    // 发起 API 请求
    const response = await appDebugService(params.app_id as string, humanQuery)
    console.log('page:', response.content)
    // 添加 AI 回复消息
    messages.value.push({
      role: 'ai',
      content: response.content,
    })
  } catch (error: any) {
    Message.error(`发送消息失败: ${error.message}`)
  } finally {
    // 修改 loading 状态
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-full">
    <!-- 顶部导航 -->
    <header class="h-[74px] flex items-center bg-gray-100 border-b border-gray-200">
      顶部导航
    </header>
    <main class="flex h-[calc(100vh-74px)]">
      <!-- 左侧的编排 -->
      <nav class="w-2/3 bg-gray-50 flex flex-col">
        <div class="h-16 border-b border-gray-200 px-7 text-xl text-gray-700 flex items-center">
          应用编排
        </div>
        <div class="flex flex-row flex-1">
          <header class="flex-1 border-r border-gray-200 p-6">人设与回复逻辑</header>
          <div class="flex-1 p-6">应用能力</div>
        </div>
      </nav>
      <!-- 右侧调试与预览 -->
      <div class="flex flex-col w-1/3 bg-white">
        <!-- 调试与预览 -->
        <header
          class="h-16 flex justify-between flex-shrink-0 items-center px-4 text-xl bg-white border-b border-gray-200 shadow-sm"
        >
          <div class="space-x-2">
            <span>调试与预览</span>
            <!-- 声音按钮，切换到语音聊天界面 -->
            <a-tooltip content="切换语音聊天模式" background-color="#165DFF">
              <a-button class="flex-shrink-0" type="text" shape="circle">
                <template #icon>
                  <icon-voice size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
            </a-tooltip>
            <!-- 声音按钮，切换到消息对话界面 -->
            <a-tooltip content="切换消息对话模式" background-color="#165DFF">
              <a-button class="flex-shrink-0" type="text" shape="circle">
                <template #icon>
                  <icon-message size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
            </a-tooltip>
          </div>
          <!-- 上下文按钮 -->
          <a-tooltip content="是否启用对话记忆" background-color="#165DFF">
            <a-switch :default-checked="true" type="round">
              <template #checked> 记忆 </template>
              <template #unchecked> 记忆 </template>
            </a-switch>
          </a-tooltip>
        </header>
        <!-- 调试对话界面 -->
        <div
          class="h-[calc(100vh-64px)] min-h-0 px-6 py-7 overflow-x-hidden overflow-y-auto scrollbar-w-none"
        >
          <!-- 消息 -->
          <div class="flex gap-2 mb-6" v-for="message in messages" :key="message.content">
            <!-- 人类头像 -->
            <a-avatar
              v-if="message.role === 'human'"
              class="flex-shrink-0"
              :style="{ backgroundColor: '#3370ff' }"
              :size="30"
            >
              壮
            </a-avatar>
            <!-- ai头像 -->
            <a-avatar
              v-else
              class="flex-shrink-0"
              :style="{ backgroundColor: '#00d0b6' }"
              :size="30"
            >
              <icon-apps />
            </a-avatar>
            <!-- 消息内容 -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">
                {{ message.role === 'human' ? '爱小美的大壮' : 'ChatGPT 聊天机器人' }}
              </div>
              <div
                class="max-w-max px-4 py-3 rounded-2xl leading-5"
                :class="
                  message.role === 'human'
                    ? 'bg-blue-600 text-white border-blue-800'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                "
              >
                {{ message.content }}
              </div>
            </div>
          </div>
          <!-- 空消息列表状态 -->
          <div
            v-if="!messages.length"
            class="mt-[200px] space-y-2 flex flex-col justify-center items-center"
          >
            <a-avatar class="bg-transparent" :size="70">
              <img src="@/assets/images/openai.png" alt="OpenAI" />
            </a-avatar>
            <div class="text-xl font-semibold text-gray-600">ChatGPT 聊天机器人</div>
          </div>
          <!-- AI加载状态 -->
          <div v-if="loading" class="flex gap-2 mb-6">
            <!-- 头像 -->
            <a-avatar class="flex-shrink-0" :style="{ backgroundColor: '#00d0b6' }" :size="30">
              <icon-apps />
            </a-avatar>
            <!-- 消息内容 -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">ChatGPT 聊天机器人</div>
              <div
                class="max-w-max bg-gray-100 text-gray-900 border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                <icon-loading />
              </div>
            </div>
          </div>
        </div>
        <!-- 输入框 -->
        <footer class="w-full flex flex-col flex-shrink-0 px-4">
          <!-- 顶部输入框 -->
          <div class="px-2 flex flex-col rounded-md border-gray-300 border">
            <div class="w-full flex-shrink-0">
              <!-- 输入框 -->
              <textarea
                @input="handleChange"
                class="w-full text-base outline-none max-h-[200px] resize-none pt-2 flex-1 bg-transparent text-inherit"
                rows="1"
                v-model="query"
              />
            </div>
            <div class="flex flex-shrink-0 justify-between">
              <!-- 清空按钮，清空上下文 -->
              <a-tooltip content="清除对话" background-color="#165DFF" @click="clearHistory">
                <a-button :disabled="loading" class="flex-shrink-0" type="text" shape="circle">
                  <template #icon>
                    <icon-empty size="16" :style="{ color: '#374151' }" />
                  </template>
                </a-button>
              </a-tooltip>
              <div class="flex items-end">
                <!-- 附件按钮 -->
                <a-tooltip content="发送附件" background-color="#165DFF">
                  <a-upload :disabled="loading" action="/" shape="circle">
                    <template #upload-button>
                      <a-button type="text" shape="circle">
                        <icon-attachment size="16" :style="{ color: '#374151' }" />
                      </a-button>
                    </template>
                  </a-upload>
                </a-tooltip>
                <!-- 发送按钮 -->
                <a-tooltip content="发送消息" background-color="#165DFF">
                  <a-button
                    :disabled="loading"
                    class="flex-shrink-0"
                    type="text"
                    shape="circle"
                    @click="sendMessage"
                  >
                    <template #icon>
                      <icon-send size="16" :style="{ color: '#1d4ed8' }" />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- 底部提示文字 -->
          <div class="text-center text-gray-500 text-xs py-2">
            内容由 AI 生成，无法确保真实准确，仅供参考。
          </div>
        </footer>
      </div>
    </main>
  </section>
</template>

<style scoped></style>
