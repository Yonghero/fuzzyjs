import type { LayoutProvider, Renderer } from '../types'
import type { FuzzyInstall } from '../types/install'
import type { RequestProvider } from '../types/requestProvider'
import { createComponent } from './component'

export function createFuzzy(): FuzzyInstall | any {
  let implRenderer: Renderer
  let implLayoutProvider: LayoutProvider
  let implRequestProvider: RequestProvider

  const install = {
    renderer,
    layoutProvider,
    requestProvider,
  }

  // 安装UI渲染器
  function renderer(renderer: Renderer) {
    implRenderer = renderer
    if (implLayoutProvider && implRequestProvider)
      return component()
    return install
  }
  function requestProvider(requestProvider: RequestProvider) {
    implRequestProvider = requestProvider

    if (implRenderer && implLayoutProvider)
      return component()

    return install
  }

  // 实现布局提供器
  function layoutProvider(layoutProvider: LayoutProvider) {
    implLayoutProvider = layoutProvider
    if (implRenderer && implRequestProvider)
      return component()

    return install
  }

  // 生成组件
  function component() {
    if (!implRenderer)
      throw new Error('Renderer is not defined')
    if (implRenderer && implRequestProvider && implLayoutProvider)
      return createComponent(implRenderer, implLayoutProvider, implRequestProvider)
  }

  return install
}
