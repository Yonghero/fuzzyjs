import type { VNode } from 'vue'
import type { FuzzyNextHandlers, Renderer, RequestCallback } from '../../types'
import type { DataProvider } from './createDataProvide'

export function createPage(renderer: Renderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider): VNode {
  const onUpdatePage = async(page: number) => {
    const {
      success,
      message,
    } = await requestCallback.get({ current: page })

    if (!success)
      renderer.message.warning(message)
  }

  return (
    <renderer.page.render
      onUpdatePage={onUpdatePage}
      total={dataProvide.total}
    />
  )
}
