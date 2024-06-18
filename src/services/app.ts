import { post } from '@/utils/request'

export const appDebugService = (app_id: string, query: string) => {
  // 返回一个 Promise 对象
  return post<{ content: string }>(`/app/${app_id}/debug`, {
    body: { query },
  })
}
