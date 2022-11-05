import { meApi } from '../apis/user';
import { defineStore } from "pinia";
import { reactive } from "vue";
import { UserType } from "../apis/user";
import { PermissionStore } from './usePermissionStore';

export const UserStore = defineStore(
  "UserStore",
  () => {
    const permissionStore = PermissionStore()
    const currentUser = reactive<UserType>({
      username: '',
      nickname: '',
      roles: [],
      permissions: []
    })
    const fetchCurrentUser = async () => {
      const response = await meApi()
      Object.assign(currentUser, response)
      permissionStore.generateRoutes(currentUser.permissions)
    }
    return { currentUser, fetchCurrentUser }
  },
  {
    persist: true,
  }
);