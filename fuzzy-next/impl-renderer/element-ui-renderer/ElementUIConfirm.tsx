import { ElPopconfirm } from 'element-plus'
import type { ConfirmRender, ConfirmRenderProps } from '../../types'

export class ElementUIConfirm implements ConfirmRender {
  render(props: Readonly<ConfirmRenderProps>, { slots }) {
    const _slots = {
      reference: () => slots && slots.default && slots.default(),
    }
    return (
      <ElPopconfirm
        v-slots={_slots}
        onConfirm={props.onOk}
        onCancel={props.onCancel}
        title={props.content}
        confirm-button-type="info"
        cancel-button-type="primary"
      />
    )
  }
}
