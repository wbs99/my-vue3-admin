import { meApi } from '../apis/user';
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { UserType } from "../apis/user";
import { usePermissionStore } from './usePermissionStore';

export const useUserStore = defineStore(
  "userStore",
  () => {
    const permissionStore = usePermissionStore()
    const currentUser = reactive<UserType>({
      username: '',
      nickname: '',
      roles: [],
      permissions: []
    })
    const fetchCurrentUser = async () => {
      const response = await meApi()
      Object.assign(currentUser, response.data)
      permissionStore.generateRoutes(currentUser.permissions)
    }
    return { currentUser, fetchCurrentUser }
  },
  {
    persist: true,
  }
);