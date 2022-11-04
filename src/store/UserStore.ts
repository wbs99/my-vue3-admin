import { meApi } from './../apis/user';
import { defineStore } from "pinia";
import { reactive } from "vue";
import { UserType } from "../apis/user";

export const UserStore = defineStore(
  "UserStore",
  () => {
    const currentUser = reactive<UserType>({
      username: '',
      nickname: '',
      roles: [],
      permissions: []
    })
    const fetchCurrentUser = async () => {
      const response = await meApi()
      Object.assign(currentUser, response)
    }
    return { currentUser, fetchCurrentUser }
  },
  {
    persist: true,
  }
);