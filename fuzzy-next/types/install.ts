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

export interface CreateFuzzyOptions {
  adapters: {
    http: RequestProvider
    layout: LayoutProvider
    renderer: Renderer
  }
  lang?: {
    filter?: string
    update?: string
    reset?: string
  }
}
