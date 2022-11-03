import { http } from "../shard/http";
import { TokenRequest } from "./types";

export const createTokenApi = (tokenRequest: TokenRequest) => http.post("/tokens", tokenRequest);