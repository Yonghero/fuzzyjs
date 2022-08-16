import type { Api, OptionsConfiguration } from '../../types'
import type { FuzzyNextHandlers } from '../../types/handler'
import type { RequestCallback, RequestProvider } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'

/**
 * 创建请求模块
 */
export function createRequest(options: OptionsConfiguration<any>, request: RequestProvider, handlers: FuzzyNextHandlers, dataProvide: DataProvider): RequestCallback {
  const filterParams = ref({})

  const getApiOfMode = (mode: keyof Api) => {
    if (typeof options.api === 'string') return options.api
    return options.api[mode]
  }

  return {
    get: async(params) => {
      let handlerParams = {}
      // invoke hook
      if (handlers.queryBefore)
        handlerParams = await handlers.queryBefore({ data: readonly(filterParams.value) })

      filterParams.value = { ...filterParams.value, ...params, ...handlerParams }

      const response = await request.get(getApiOfMode('filter'), filterParams.value)

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
