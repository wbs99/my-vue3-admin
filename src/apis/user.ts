import { http } from "../shared/http"

export type UserType = {
  username: string
  nickname: string
  roles: string[]
  permissions: string[]
}


export const meApi = () => http.get<UserType>('users/me');