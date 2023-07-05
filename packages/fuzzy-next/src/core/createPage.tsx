import { defineComponent, ref, unref, watch } from 'vue'
import type { CreateFuzzyOptions, FuzzyNextHandlers, OptionsConfiguration, PagingProvider, Renderer, RequestCallback } from '../../../../types'
import { FuzzyComponentSize } from '../extend'
import type { DataProvider } from './createDataProvide'

export function createPage(renderer: Renderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, paging: PagingProvider, options: OptionsConfiguration, fuzzyOptions: CreateFuzzyOptions) {
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
      const currentPageSize = ref(20)

      const pageProps = {} as { pageSize: number; pageSizes: number[]; onSizeChange: (size: number) => void }

      if (options.pagination?.pageSize || fuzzyOptions?.adapters.paging.pageSize) {
        const config = options.pagination || fuzzyOptions.adapters.paging
        if (!config) return

        const {
          pageSize,
          pageSizes = [],
        } = config

        currentPageSize.value = pageSize || 20
        pageProps.pageSize = currentPageSize.value

        if (pageSizes.length)
          pageProps.pageSizes = pageSizes
      }

      pageProps.onSizeChange = (size) => {
        currentPageSize.value = size
      }

      watch(page, async() => {
        await onUpdatePage({ [paging.current]: page.value })
      })

      watch(currentPageSize, async() => {
        await onUpdatePage({ [paging.current]: page.value, [paging.size]: currentPageSize.value })
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
              : (
            // @ts-expect-error anyway
                <renderer.page.render
                  v-model={page.value}
                  total={dataProvide.total}
                  size={unref(FuzzyComponentSize)}
                  {...pageProps}
                />
              )
          }

        </>
      )
    },
  })
  return <Page/>
}
