import { HttpResponse } from '@/api/interceptor'

export interface RequestHooksOptions {
  loading?: boolean
}

export interface RequestHooks<T = unknown> {
  options: RequestHooksOptions
  service: () => Promise<HttpResponse<T>>
}
