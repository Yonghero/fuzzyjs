import type { ComponentOptionsMixin } from '@vue/runtime-core'

import type { LayoutProvider } from './layoutProvider'
import type { ExtendFormItem, Renderer } from './renderer'
import type { RequestProvider } from './requestProvider'

export interface FuzzyInstall {
  renderer: (renderer: Renderer) => FuzzyInstall | (ComponentOptionsMixin)
  requestProvider: (provider: RequestProvider) => FuzzyInstall | (ComponentOptionsMixin)
  layoutProvider: (layoutProvider: LayoutProvider) => FuzzyInstall | (ComponentOptionsMixin)
}

export interface FuzzyPluginOptions {
  installUIPlugin: (items: ExtendFormItem[]) => void
}

// 请求服务端分页的键
export interface PagingProvider {
  current: string
  size: string
}

export interface CreateFuzzyOptions {
  adapters: {
    http: RequestProvider
    layout: LayoutProvider
    renderer: Renderer
    paging: PagingProvider
  }
  lang?: {
    filter?: string
    update?: string
    reset?: string
  }
}
