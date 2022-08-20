import type { CreateFuzzyOptions } from '../types'
import { ElementUIRenderer } from '../impl-renderer'
import { DefaultLayoutProvider } from '../impl-layout-provider'
import { createComponent } from './component'
import { use } from './extend'

export function createFuzzy(options: CreateFuzzyOptions): any {
  const {
    http,
    layout,
    renderer,
    paging,
  } = options.adapters

  const implRenderer = renderer || new ElementUIRenderer()
  const implLayoutProvider = layout || new DefaultLayoutProvider()
  const implPaging = paging || { current: 'current', size: 'size' }
  const implRequestProvider = http

  if (!http)
    throw new Error('fuzzy-next requestProvider is required')

  // 生成组件
  function component() {
    return createComponent(implRenderer, implLayoutProvider, implRequestProvider, implPaging, options)
  }

  return {
    component,
    use,
  }
}
