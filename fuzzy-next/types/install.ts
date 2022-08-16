import type { ComponentOptionsMixin } from '@vue/runtime-core'

import type { LayoutProvider } from './layoutProvider'
import type { OptionsConfiguration } from './options'
import type { Renderer } from './renderer'
import type { RequestProvider } from './requestProvider'

export interface FuzzyInstall {
  renderer: (renderer: Renderer) => FuzzyInstall | (ComponentOptionsMixin)
  requestProvider: (provider: RequestProvider) => FuzzyInstall | (ComponentOptionsMixin)
  layoutProvider: (layoutProvider: LayoutProvider) => FuzzyInstall | (ComponentOptionsMixin)
}
