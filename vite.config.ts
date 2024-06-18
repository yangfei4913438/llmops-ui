import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'add-script',
      transformIndexHtml(html) {
        if (process.env.NODE_ENV === 'development') {
          // 在开发环境中注入 Vite WebSocket 连接
          return html.replace('</body>', `<script src="http://localhost:8098" ></script></body>`)
        }
      },
    },
  ],
  server: {
    // 代理设置查看 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {
      // 访问 /api/test 等价于访问 http://localhost:3001/test
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
