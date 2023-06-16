export interface HttpResponse<T = unknown> {
  status: number
  message: string
  success: boolean
  data?: T
}
