import { GetConfig, http } from "../shared/http"
import { ListResult, UserCreateRequest, UserFilter, UserType } from "./types";

export const meApi = () => http.get<UserType>('users/me')

export const userListApi = (filterParams: UserFilter, loading: GetConfig) => http.get<ListResult<UserType>>('/users', filterParams, loading)

export const createUserApi = (userCreateRequest: UserCreateRequest) => http.post<UserType>("/users", userCreateRequest)

export const editUserApi = (id: string, userEditRequest: UserCreateRequest) => http.post<UserType>(`/user/${id}`, userEditRequest)