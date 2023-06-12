import { ElButton } from 'element-plus'
import type { ButtonRenderer } from '../../../../types'

export class ElementUIButton implements ButtonRenderer {
  render(props, { slots }) {
    if (props.type === 'create') {
      return <ElButton
        type="primary"
        class="cursor-pointer text-white rounded flex items-center justify-center"
        size={props.size}
      >
        +
      </ElButton>
    }
    if (props.type === 'update') {
      return <div style="background: #F0F0F0;border-radius:5px;color:#0078FF"
        class="w-14 h-7 p-3 flex items-center justify-center cursor-pointer">
        编辑
      </div>
    }
    if (props.type === 'delete') {
      return <div style="background: #F0F0F0;border-radius:5px;color:#FF0000"
        class="w-14 h-7 p-3 flex items-center justify-center cursor-pointer">
        删除
      </div>
    }
    if (props.type === 'filter') {
      return <ElButton
        type="primary"
        class="cursor-pointer text-white flex items-center justify-center"
        size={props.size}
      >
        {
          slots.default && slots.default()
        }
      </ElButton>
    }
    if (props.type === 'operate') {
      return <div
        class="w-14 h-7 p-3 flex items-center justify-center cursor-pointer"
        style={{ color: props.color || '#0078FF', background: '#F0F0F0', borderRadius: '5px' }}
        onClick={props.onClick}
      >
        {
          slots.default && slots.default()
        }
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
