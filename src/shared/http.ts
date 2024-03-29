import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'
import { useAppStore } from '../store/useAppStore'
import type { ErrorResponse } from '../apis/types'

export type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

const baseUrl: string = import.meta.env.VITE_API_BASE_URL
export const http = new Http(baseUrl)

// set header
http.instance.interceptors.request.use(config => {
  const appStore = useAppStore()
  const token = appStore.token
  if (token) { config.headers!.Authorization = `Bearer ${token}` }
  if (config._autoLoading === true) {
    appStore.openLoading()
  }
  return config
})

// loading
http.instance.interceptors.response.use(
  response => {
    const appStore = useAppStore()
    if (response.config._autoLoading === true) {
      appStore.closeLoading()
    }
    return response
  },
  (error: AxiosError) => {
    const appStore = useAppStore()
    if (error.response?.config._autoLoading === true) {
      appStore.closeLoading()
    }
    throw error
  }
)

// 统一错误处理
http.instance.interceptors.response.use(
  response => response,
  (error: AxiosError<ErrorResponse>) => {
    const responseData: ErrorResponse | undefined = error.response?.data
    responseData && (MessagePlugin.error(responseData.message))
    if (error.response?.status === 429) { alert('请求太频繁') }
    throw error
  }
)
