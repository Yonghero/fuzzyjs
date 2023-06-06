import { defineComponent, ref, watch } from 'vue'
import type { FuzzyNextHandlers, PagingProvider, Renderer, RequestCallback } from '../../../../types'
import type { DataProvider } from './createDataProvide'

export function createPage(renderer: Renderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, paging: PagingProvider) {
  const onUpdatePage = async(params) => {
    const {
      success,
      message,
    } = await requestCallback.get({ [paging.current]: params[paging.current], [paging.size]: paging.sizeNum || 10 })

    if (!success)
      renderer.message.warning(message)
  }

  const Page = defineComponent({
    setup() {
      const page = ref(1)

      watch(page, async() => {
        await onUpdatePage({ [paging.current]: page.value })
      })

      watch(() => dataProvide.currentPage.value, () => {
        // eslint-disable-next-line no-empty
        if (page.value !== dataProvide.currentPage.value)
          page.value = dataProvide.currentPage.value
      })

      return () => (
        <>
          {
            +dataProvide.total.value <= dataProvide.filterParams.value[paging.size] || !dataProvide.total.value
              ? null
              : <renderer.page.render
                v-model={page.value}
                total={dataProvide.total}
              />
          }

        </>
      )
    },
  })
  return <Page/>
}
