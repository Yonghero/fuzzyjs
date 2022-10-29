import type { CreateFuzzyOptions } from '../../../types'
import { createComponent } from './component'
import { use } from './extend'

export function createFuzzy(options: CreateFuzzyOptions): any {
  const {
    http,
    layout,
    renderer,
    paging,
  } = options.adapters

  if (!renderer || !layout || !http)
    throw new Error('fuzzy-next renderer & layoutProvider & requestProvider is required')

  const implRenderer = renderer
  const implLayoutProvider = layout
  const implPaging = paging || { current: 'index', size: 'size' }
  const implRequestProvider = http

  // 生成组件
  function component() {
    return createComponent(implRenderer, implLayoutProvider, implRequestProvider, implPaging, options)
  }

  return {
    component,
    use,
  }
}
