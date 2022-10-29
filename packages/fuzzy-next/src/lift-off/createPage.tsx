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
      const c = ref(1)

      watch(c, async() => {
        await onUpdatePage({ [paging.current]: c.value })
      })

      watch(() => dataProvide.currentPage.value, () => {
        // eslint-disable-next-line no-empty
        if (c.value === dataProvide.currentPage.value) {

        }
        else {
          c.value = dataProvide.currentPage.value
        }
      })
      return () => (
        <>
          {
            +dataProvide.total.value <= dataProvide.filterParams.value[paging.size] || !dataProvide.total.value
              ? null
              : <renderer.page.render
                v-model={c.value}
                total={dataProvide.total}
              />
          }

        </>
      )
    },
  })
  return <Page/>
}
