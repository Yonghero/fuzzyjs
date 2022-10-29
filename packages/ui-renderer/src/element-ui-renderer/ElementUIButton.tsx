import { ElButton } from 'element-plus'
import type { ButtonRenderer } from '../../../../types'

export class ElementUIButton implements ButtonRenderer {
  render(props, { slots }) {
    if (props.type === 'create') {
      return <div
        class="w-12 h-8 text-xl cursor-pointer text-white rounded bg-[#0971FF] flex items-center justify-center">
        +
      </div>
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
      return <div
        class="bg-[#0971FF] w-20 h-8 cursor-pointer rounded-[6px] text-white flex items-center justify-center"
        style="font-size:14px!important"
      >
        {
          slots.default && slots.default()
        }
      </div>
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
