import type { RequestProvider, Response } from '../../../../types'

/**
 * 联图请求提供器
 */
export interface LTResponse {
  code: number
  message: string
  data: any
  total: number
  size: number
  page: number
}

export class DefaultRequestProvider implements RequestProvider {
  _instance: any

  constructor(instance: any) {
    this._instance = instance
  }

  delete(url: string, params: any): Promise<Pick<Response, 'success' | 'message'>> {
    return this._instance.delete(`${url}/${params.row.id}`)
      .then(res => this.implResponse(res))
  }

  get(url: string, params: any): Promise<Required<Response>> {
    return this._instance.get(
      url,
      { params: { size: 10, index: 1, ...params } },
    )
      .then(res => this.implResponse(res))
  }

  post(url: string, params: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    // TODO 闲暇时迁移
    // 因子组接口特殊处理
    if (url === '/environ/factor/group') {
      const _p = { ...params }
      delete _p.factors
      return this._instance({
        method: 'post',
        url,
        params: _p,
        data: [
          ...params.factors.map((f) => {
            return {
              factorId: f,
            }
          }),
        ],
      },
      ).then(this.implResponse)
    }
    return this._instance({
      method: 'post',
      url,
      data: { ...params },
    }).then(this.implResponse)
  }

  put(url: string, params: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    return this._instance({
      method: 'put',
      url,
      data: { ...params },
    }).then(res => this.implResponse(res))
  }

  implResponse(response: LTResponse): Response {
    return {
      data: response?.data?.data,
      message: response?.message,
      total: +response?.data?.total,
      size: +response?.data?.size,
      success: +response.code === 10000,
    }
  }
}
