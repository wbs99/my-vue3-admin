import { http } from '../shared/http'
import type { TokenRequest } from './types'

export const createTokenApi = (tokenRequest: TokenRequest) => http.post<string>('/tokens', tokenRequest)
