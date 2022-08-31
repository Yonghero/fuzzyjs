import type {
  Api,
  FuzzyNextHandlers,
  OptionsConfiguration,
  PagingProvider,
  RequestCallback,
  RequestProvider,
} from '../../types'
import type { DataProvider } from './createDataProvide'

/**
 * 创建请求模块
 */
export function createRequest(options: OptionsConfiguration, request: RequestProvider, handlers: FuzzyNextHandlers, dataProvide: DataProvider, paging: PagingProvider): RequestCallback {
  const getApiOfMode = (mode: keyof Api) => {
    if (typeof options.api === 'string') return options.api
    return options.api[mode]
  }

  return {
    get: async(params) => {
      debugger
      let handlerParams = {}
      // invoke hook
      if (handlers.queryBefore) {
        handlerParams = await handlers.queryBefore({
          data: { ...dataProvide.filterParams.value, ...params },
        })
      }
      dataProvide.filterParams.value = { ...dataProvide.filterParams.value, ...params, ...handlerParams }

      dataProvide.dispatch.setCurrentPage(dataProvide.filterParams.value[paging.current])

      const response = await request.get(getApiOfMode('filter'), dataProvide.filterParams.value)

      if (response.success) {
        dataProvide.dispatch.setTableData(response.data)
        dataProvide.dispatch.setTotal(response.total)
      }

      return response
    },
    delete: (params) => {
      return request.delete(getApiOfMode('delete'), params)
    },
    put: async(params: Record<string, any>) => {
      return request.put(getApiOfMode('update'), params)
    },
    post: async(params: Record<string, any>) => {
      return request.post(getApiOfMode('create'), params)
    },
    urls: {
      filter: getApiOfMode('filter'),
      update: getApiOfMode('update'),
      delete: getApiOfMode('delete'),
      create: getApiOfMode('create'),
    },
  }
}
