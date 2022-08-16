import type { RequestProvider, Response } from '../../types/requestProvider'

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
    return this._instance.delete(`${url}?id=${params.row.id}`)
      .then(res => this.implResponse(res.data))
  }

  get(url: string, params: any): Promise<Required<Response>> {
    return this._instance.get(
      url,
      { params: { size: 10, current: 1, ...params } },
    )
      .then(res => this.implResponse(res.data))
  }

  post(url: string, params: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    console.log('post', params)
    return Promise.resolve({
      message: '编辑成功',
      success: true,
      data: 0,
    })
  }

  put(url: string, params: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    console.log('put', params)
    return Promise.resolve({
      message: '编辑成功',
      success: true,
      data: 0,
    })
  }

  implResponse(response: LTResponse): Response {
    return {
      data: response.data,
      message: response.message,
      total: response.total,
      size: response.size,
      success: response.code === 10000,
    }
  }
}
