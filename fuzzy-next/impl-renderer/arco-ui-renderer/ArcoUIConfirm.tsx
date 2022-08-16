import { Popconfirm } from '@arco-design/web-vue'
import type { ConfirmRender, ConfirmRenderProps } from '../../types'

export class ArcoUIConfirm implements ConfirmRender {
  render(props: Readonly<ConfirmRenderProps>, { slots }) {
    return (
      <Popconfirm
        type={props.type || 'info'}
        onOk={props.onOk}
        onCancel={props.onCancel}
        content={props.content}
        okButtonProps={{ type: 'secondary' }}
        cancelButtonProps={{ type: 'primary' }}
      >
        {
          slots && slots.default && slots.default()
        }
      </Popconfirm>
    )
  }
}
