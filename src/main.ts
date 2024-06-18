import devtools from '@vue/devtools'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import App from '@/App.vue'
import router from '@/router'

import '@arco-design/web-vue/dist/arco.css'
import '@/assets/styles/tailwind.css'

// 仅在开发环境中启用 Vue Devtools
if (import.meta.env.DEV) {
  devtools.connect('localhost', 8098) // 默认情况下，host 为 localhost，port 为 8098
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
