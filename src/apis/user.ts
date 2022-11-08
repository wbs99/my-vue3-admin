import { AxiosResponse } from "axios";
import { GetConfig, http } from "../shared/http"

export type UserType = {
  id: string;
  username: string
  nickname: string
  roles: string[]
  permissions: string[]
}
export const meApi = () => http.get<UserType>('users/me')


export interface UserFilter extends Paging {
  name: string;
}
export interface Paging {
  page?: number;
  size?: number;
  total?: number;
}

export type ListResult<T> = {
  paging: Paging;
  data: Array<T>;
};
export const userListApi = (filterParams: UserFilter, loading: GetConfig) => http.get<ListResult<UserType>>('/users', filterParams, loading)