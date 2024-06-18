interface UserAccount {
  id: number
  name: string
  email: string
  avatar: string
  password: string
  created_at: string
  updated_at: string
}

interface UserAccountState {
  // 用户名
  name: string
  // 邮箱
  email: string
  // 头像
  avatar: string
  // 密码
  password: string
}
