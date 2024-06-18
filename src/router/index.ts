import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/views/layout/DefaultLayout.vue'
import BlankLayout from '@/views/layout/BlankLayout.vue'
import { isLogin } from '@/router/authCheck'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '', // 默认子路由
          name: 'home',
          redirect() {
            // 重定向
            return { name: 'pages-home' }
          },
        },
        {
          path: 'home',
          name: 'pages-home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'pages-about',
          component: () => import('@/views/AboutView.vue'),
        },
        {
          path: 'space/apps',
          name: 'space-apps-list',
          component: () => import('@/views/space/apps/ListView.vue'),
        },
        {
          path: 'space/apps/:app_id',
          name: 'space-apps-detail',
          component: () => import('@/views/space/apps/DetailView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'blank',
      component: BlankLayout,
      children: [
        {
          path: 'auth/login',
          name: 'auth-login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'space/app/:app_id/',
          name: 'space-app',
          component: () => import('@/views/space/apps/AppView.vue'),
        },
      ],
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach from', from)
  console.log('beforeEach to', to)
  // 登录页不需要权限
  if (to.name === 'auth-login') {
    return next()
  }
  // 权限检查
  if (!isLogin()) {
    return next({ name: 'auth-login' })
  }
  // 正常放行
  next()
})

export default router
