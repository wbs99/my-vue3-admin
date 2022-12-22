import { GetConfig, http } from "../shared/http"

export type UserType = {
  id: string;
  username: string
  nickname: string
  roles: string[]
  permissions: string[]
}

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
export interface UserCreateRequest {
  username: string;
  nickname: string;
  roles?: string[];
}

export const meApi = () => http.get<UserType>('users/me')

export const userListApi = (filterParams: UserFilter, loading: GetConfig) => http.get<ListResult<UserType>>('/users', filterParams, loading)

export const createUserApi = (userCreateRequest: UserCreateRequest) => http.post<UserType>("/users", userCreateRequest)

export const editUserApi = (id: string, userEditRequest: UserCreateRequest) => http.post<UserType>(`/user/${id}`, userEditRequest)