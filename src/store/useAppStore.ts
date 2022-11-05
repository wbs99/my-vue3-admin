import { MessagePlugin } from 'tdesign-vue-next';
import { defineStore } from "pinia";
import { ref } from "vue";
import { createTokenApi } from "../apis/token";
import { TokenRequest } from "../apis/types";


export const useAppStore = defineStore(
  "appStore",
  () => {
    const token = ref('')
    const menuStatus = ref(true)
    const login = async (loginForm: TokenRequest) => {
      const response: any = await createTokenApi(loginForm)
      token.value = response
      MessagePlugin.success('登录成功')
    }
    const logout = () => {
      token.value = ''
      localStorage.removeItem('userStore')
    }
    return { token, login, logout, menuStatus };
  },
  {
    persist: true,
  }
);