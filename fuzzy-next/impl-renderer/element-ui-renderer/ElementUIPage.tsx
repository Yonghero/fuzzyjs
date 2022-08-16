import { ElPagination } from 'element-plus'
import {PageProps} from '../../types'
import type { PageRenderer } from '../../types'

export class ElementUIPage implements PageRenderer {
  render({ total }:PageProps, { emit }) {

    const onUpdate = (page: number) => {
      emit('updatePage', page)
    }

    return (
      <div>
        <ElPagination
          onUpdate:current-page={onUpdate}
          background
          layout="prev, pager, next"
          total={total.value} />
      </div>
    )
  }
}
