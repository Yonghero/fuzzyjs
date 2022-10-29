import { ElPagination } from 'element-plus'
import type { PageRenderer } from '../../../../types'

export class ElementUIPage implements PageRenderer {
  render({ total, modelValue }: any, { emit }) {
    const onUpdate = (page: number) => {
      emit('update:modelValue', page)
    }
    return (
      <div>
        <ElPagination
          currentPage={modelValue}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error 12
          onCurrentChange={onUpdate}
          background
          layout="prev, pager, next"
          total={total.value}/>
      </div>
    )
  }
}
