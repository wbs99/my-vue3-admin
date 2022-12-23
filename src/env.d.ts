/// <reference types="vite/client" />

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Mock = (config: AxiosRequestConfig) => [number, any]

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}