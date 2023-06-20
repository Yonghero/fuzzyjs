import { ElPagination } from 'element-plus'
import type { PageRenderer } from '../../../../types'

export class ElementUIPage implements PageRenderer {
  render(props, { emit }) {
    const layout = ref('prev, pager, next')
    const onUpdate = (page: number) => {
      emit('update:modelValue', page)
    }
    const pageProps = {} as { small: boolean; pageSizes: number[]; pageSize: number; onSizeChange: (size: number) => void }

    // 分页尺寸
    if (props.size && props.size === 'small')
      pageProps.small = true

    // 分页条数
    if (props.pageSize) {
      layout.value = 'sizes, prev, pager, next'
      setTimeout(() => {
        pageProps.pageSize = props.pageSize
        pageProps.pageSizes = props.pageSizes
      }, 500)

      pageProps.onSizeChange = (size: number) => {
        emit('size-change', size)
      }
    }

    return (
      <ElPagination
        currentPage={props.modelValue}
        // @ts-expect-error anyway
        onCurrentChange={onUpdate}
        background
        layout={layout.value}
        total={unref(props.total)}
        {...pageProps}
      />
    )
  }
}
