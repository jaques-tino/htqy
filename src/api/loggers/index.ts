import { HttpResponse } from '../interceptor'
import service from '../service'
import { Logger } from './type'

export const getLoggers = (page: number, logger?: Logger, size?: number) => {
  return service({
    url: '/loggers',
    params: {
      page,
      size
    },
    data: {
      ...logger
    }
  }) as Promise<HttpResponse<Logger[]>>
}
