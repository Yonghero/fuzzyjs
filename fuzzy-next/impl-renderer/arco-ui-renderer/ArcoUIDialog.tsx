import { Modal } from '@arco-design/web-vue'
import type { DialogRenderProps, DialogRenderer } from '../../types'
import { ArcoUIButton } from './ArcoUIButton'

export class ArcoUIDialog implements DialogRenderer {
  render(props: Readonly<DialogRenderProps>, { slots, emit }) {
    const button = new ArcoUIButton()

    const _slots = {
      title: () => (
        <div class="flex items-center">
          <div class="w-1 h-4.5 rounded-sm bg-primary-100 mr-2"/>
          <h1>{props.title}</h1>
        </div>
      ),
      footer: (scope) => props.footer
        ? props.footer
        : <div
          class="dialog-footer-box"
        >
          <button.render
            class="btn reset"
            plain
            onClick={() => emit('update:modelValue', false)}
          >取消</button.render>
          <button.render
              onClick={() => emit('update', scope)}
            class="btn confirm"
          >确定
          </button.render>
        </div>,
    }

    return (
      <Modal v-slots={_slots}
        {...props.style}
        v-model:visible={props.modelValue}
      >

        {
          slots && slots.default && slots.default()
        }
      </Modal>
    )
  }
}
