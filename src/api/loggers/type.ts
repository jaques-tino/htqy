export interface Logger {
  id: string
  requestURL: string
  requestMethod: string
  requestParams: string
  requestBody: string
  requestIp: string
  errorMessage: string
  errorStatus: string
  appVersion: string
  browserInfo: string
  serviceInfo: string
  createdAt: string
  updateAt: string
}
