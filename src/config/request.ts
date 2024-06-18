// api 请求接口前缀, 不要以 / 结尾。这里的配置是直接访问后端，后端配置了允许跨域
export const API_PREFIX = 'http://127.0.0.1:8000'

// 请求超时时间，默认: 30秒
export const REQUEST_TIMEOUT = 30000

// 内部状态码
export enum HttpCode {
  // 成功
  SUCCESS = 'success',
  // 失败
  FAIL = 'fail',
  // 未找到
  NOT_FOUND = 'not_found',
  // 未授权
  UNAUTHORIZED = 'unauthorized',
  // 禁止
  FORBIDDEN = 'forbidden',
  // 参数验证错误
  VALIDATE_ERROR = 'validate_error',
}
