import { RequestHooks } from './type'

export const useRequest = async <T>(service: RequestHooks<T>['service']) => {
  const res = await service()
  return res
}
