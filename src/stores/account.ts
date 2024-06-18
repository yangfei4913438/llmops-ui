import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const initAccount: UserAccountState = {
  name: 'test',
  email: 'test@163.com',
  avatar: '',
  password: '',
}

export const useAccountStore = defineStore('account', () => {
  // 定义数据
  const account = ref<UserAccountState>({ ...initAccount })

  // 计算属性
  const showName = computed(() => account.value.name.toLocaleUpperCase())

  // 更新数据
  const updateAccount = (data: Partial<UserAccountState>) => {
    // 将data的数据合并到account.value中
    Object.assign(account.value, data)
  }

  // 重置数据
  const resetAccount = () => {
    account.value = { ...initAccount }
  }

  // 返回数据
  return { account, showName, updateAccount, resetAccount }
})
