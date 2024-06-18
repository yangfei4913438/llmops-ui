interface BaseOptions {
  params?: Record<string, any>
  body?: Record<string, any>
  options?: RequestInit
  timeout?: number
}

// 响应格式
interface ResponseData<T> {
  code: string
  message: string
  data: T
}
// 基础分页响应格式
interface BasePaginatorResponse<T>
  extends ResponseData<{
    list: T[]
    paginator: {
      total: number
      total_page: number
      current_page: number
      page_size: number
    }
  }> {}
