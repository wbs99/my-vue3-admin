import { MessagePlugin } from 'tdesign-vue-next'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTokenApi } from '../apis/token'
import type { TokenRequest } from '../apis/types'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const token = ref('')
    const menuStatus = ref(true)
    const loading = ref(false)
    const login = async (loginForm: TokenRequest) => {
      const response = await createTokenApi(loginForm)
      token.value = response.data
      MessagePlugin.success('登录成功')
    }
    const logout = () => {
      token.value = ''
      localStorage.removeItem('userStore')
    }
    const openLoading = () => loading.value = true
    const closeLoading = () => loading.value = false
    return { token, login, logout, menuStatus, openLoading, closeLoading, loading }
  },
  {
    persist: true,
  }
)
