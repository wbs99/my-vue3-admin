import { http } from "../shared/http";
import { TokenRequest } from "./types";

export const createTokenApi = (tokenRequest: TokenRequest) => http.post("/tokens", tokenRequest);