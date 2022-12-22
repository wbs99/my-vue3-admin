import { http } from "../shared/http";
import { ListResult, RoleCreateRequest, RoleFilter, RoleType } from "./types";

export const roleListApi = (filter: RoleFilter) => http.get<ListResult<RoleType>>("/roles", { params: filter })

export const createRoleApi = (roleCreateRequest: RoleCreateRequest) => http.post<RoleType>("/roles", roleCreateRequest);

// Todo:
export const editRoleApi = (id: string, roleEditRequest: RoleCreateRequest) => http.post<RoleType>(`/roles/${id}`, roleEditRequest);


