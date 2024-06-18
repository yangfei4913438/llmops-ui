// request 请求封装
import fetchRetry from 'fetch-retry'
import { API_PREFIX, HttpCode, REQUEST_TIMEOUT } from '@/config/request'
import { Message } from '@arco-design/web-vue'

// 配置重试次数和间隔
const fetch = fetchRetry(globalThis.fetch, {
  retries: 3, // 设置重试次数
  retryDelay: (attempt) => Math.pow(2, attempt) * 1000, // 使用指数退避算法
  retryOn: [500, 502, 503, 504], // 需要重试的状态码
})

const baseOptions: RequestInit = {
  // 默认请求头
  headers: {
    accept: 'application/json', // 默认接收 json 格式的响应
    'Content-Type': 'application/json', // 默认发送 json 格式的请求体
  },
  method: 'GET', // 默认请求方法
  mode: 'cors', // 启用跨域请求
  credentials: 'include', // 携带认证信息
  redirect: 'follow', // 支持重定向
}

// 将传入的 params 对象转换为查询字符串
const encodeQueryParams = (params: Record<string, any>) => {
  // 检查 params 是否是一个对象
  if (typeof params !== 'object' || params === null || Array.isArray(params)) {
    throw new Error('encodeQueryParams: url查询参数必须是一个对象')
  }
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    // 将每个值转换为字符串并添加到searchParams中
    searchParams.append(key, value.toString())
  }
  return searchParams.toString()
}

// 封装基础的请求方法
const fetchWrapper = async <T>(
  url: string,
  options: RequestInit,
  params?: Record<string, any>,
  timeout = REQUEST_TIMEOUT, // 默认超时时间
): Promise<T> => {
  // 创建一个 AbortController 实例，它是一个浏览器 API，用来取消 fetch 请求。
  const controller = new AbortController()
  // 设置一个定时器，在指定的 timeout 时间后调用 abort 方法
  const id = setTimeout(() => controller.abort(), timeout)

  // 合并请求数据
  const requestOptions: RequestInit = Object.assign({}, baseOptions, options)
  if (options?.headers) {
    requestOptions.headers = Object.assign({}, baseOptions.headers, options.headers)
  }

  // 处理查询参数
  const queryString = params ? `?${encodeQueryParams(params)}` : ''

  // 如果 API_PREFIX 以 / 结尾，去掉结尾的 /
  const base_url = API_PREFIX.endsWith('/') ? API_PREFIX.slice(0, -1) : API_PREFIX

  // 如果 url 以 / 开头，直接使用，否则在前面加上 /
  const query_path = url.startsWith('/') ? url : `/${url}`

  // 拼接 base_url 和 相对路径
  const fullUrl = `${base_url}${query_path}${queryString}`
  console.log('fullUrl:', fullUrl)

  try {
    const response = await fetch(fullUrl, requestOptions)
    // 请求完成后，清除定时器
    clearTimeout(id)
    // 检查请求是否成功
    if (!response.ok) {
      const errorText = await response.text().catch(() => '未知错误')
      return Promise.reject(errorText || `请求失败，状态码：${response.status}`)
    }
    const jsonData: ResponseData<T> = await response.json()
    if (jsonData.code === HttpCode.SUCCESS) {
      return jsonData.data
    } else {
      Message.error(jsonData.message)
      return Promise.reject(jsonData.message)
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`Request aborted for ${fullUrl}`)
      // 输出超时信息到控制台
      Message.error(`Request timed out for ${fullUrl}`)
    } else {
      console.error(`Request error for ${fullUrl}:`, error)
      // 输出其他类型的错误
      Message.error(`Request error for ${fullUrl}:`, error)
    }
    // 返回异常错误信息
    return Promise.reject(error)
  }
}

const requestData = <T>(
  method: 'POST' | 'PUT' | 'GET' | 'DELETE', // 请求方法
  url: string, // 请求url
  requestOptions: BaseOptions = {}, // 请求配置
) => {
  // 默认配置
  const { options = {}, body, params, timeout = REQUEST_TIMEOUT } = requestOptions
  // 处理请求体
  if (body) {
    options.body = JSON.stringify(body)
  }
  // 调用封装的 fetch 方法
  return fetchWrapper<T>(url, { ...options, method }, params, timeout)
}

// 封装 POST 请求
export function post<T>(url: string, options?: BaseOptions): Promise<T> {
  return requestData('POST', url, options)
}

// 封装 PUT 请求
export function put<T>(url: string, options?: BaseOptions): Promise<T> {
  return requestData('PUT', url, options)
}

// 封装 GET 请求
export function get<T>(url: string, options?: BaseOptions): Promise<T> {
  return requestData('GET', url, options)
}

// 封装 DELETE 请求
export function del<T>(url: string, options?: BaseOptions): Promise<T> {
  return requestData('DELETE', url, options)
}
