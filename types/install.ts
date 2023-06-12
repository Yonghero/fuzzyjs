import type { ComponentOptionsMixin } from 'vue'
import type { LayoutProvider } from './layoutProvider'
import type { ExtendFormItem, Renderer } from './renderer'
import type { RequestProvider } from './requestProvider'
import type { Templates } from './options'

export interface FuzzyInstall {
  renderer: (renderer: Renderer) => FuzzyInstall | (ComponentOptionsMixin)
  requestProvider: (provider: RequestProvider) => FuzzyInstall | (ComponentOptionsMixin)
  layoutProvider: (layoutProvider: LayoutProvider) => FuzzyInstall | (ComponentOptionsMixin)
}

export interface FuzzyPluginOptions {
  installUIPlugin: (items: ExtendFormItem[]) => void
}

export abstract class RestTemplatePlugin {
  abstract install(...rest): void

  uuid = ''
}

// 请求服务端分页的键
export interface PagingProvider {
  current: string
  size: string
  sizeNum?: number
}

export type FuzzySize = 'small' | 'default' | 'large'
export interface CreateFuzzyOptions {
  size?: FuzzySize
  adapters: {
    http: RequestProvider
    layout: LayoutProvider
    renderer: Renderer
    paging: PagingProvider
  }
  lang?: {
    filter?: string
    update?: string
    create?: string
    reset?: string
  }
  message?: {
    deleteSuccess?: string
    updateSuccess?: string
    createSuccess?: string
    success?: string
  }
  plugins?: RestTemplatePlugin[]
}

export interface TemplateMiddlewareCallback {
  (templates: Templates[], type: string): Templates[]
}
