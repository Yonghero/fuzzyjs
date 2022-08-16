import { ElButton } from 'element-plus'
import type { ButtonRenderer } from '../../types'

export class ElementUIButton implements ButtonRenderer {
  render(props, { slots }) {
    if (props.type === 'create') {
      return <div class="w-9 h-9 font-extrabold text-xl cursor-pointer text-white rounded bg-primary-100 flex items-center justify-center">
        +
      </div>
    }
    return (
      <ElButton {...props}>
        {
          slots.default && slots.default()
        }
      </ElButton>
    )
  }
}
