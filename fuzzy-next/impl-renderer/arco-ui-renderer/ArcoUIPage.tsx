import { Pagination } from '@arco-design/web-vue'
import type { PageProps, PageRenderer } from '../../types'

export class ArcoUIPage implements PageRenderer {
  render({ total }: PageProps, { emit }) {
    const onUpdate = (page: number) => {
      emit('updatePage', page)
    }

    return (
      <div>
        <Pagination
          total={total.value}
          onChange={onUpdate} />
      </div>
    )
  }
}
