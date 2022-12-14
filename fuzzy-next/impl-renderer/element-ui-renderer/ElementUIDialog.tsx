import { ElDialog } from 'element-plus'
import type { DialogRenderProps, DialogRenderer } from '../../types'
import { ElementUIButton } from './ElementUIButton'
import '../element-ui.scss'

export class ElementUIDialog implements DialogRenderer {
  render(props: Readonly<DialogRenderProps>, { slots, emit }) {
    const button = new ElementUIButton()

    const _slots = {
      header: () => (
        <div class="flex items-center border-b-gray-200 border-b-2 pb-1 w-full">
          <div class="w-1 h-5 rounded-sm bg-primary-100 mr-2"/>
          {
            typeof props.title === 'function'
              ? props.title()
              : <h2 class="font-bold text-lg">{unref(props.title)}</h2>
          }

        </div>
      ),
      footer: scope => props.footer
        ? typeof props.footer === 'function' ? props.footer() : <props.footer></props.footer>
        : <div
          class="dialog-footer-box"
        >
          <button.render
            type="primary"
            class="btn reset"
            plain
            onClick={() => {
              emit('update:modelValue', false)
              emit('cancel', scope)
            }}
          >取消
          </button.render>
          <button.render
            type="primary"
            class="btn confirm"
            onClick={() => emit('update', scope)}
          >确定
          </button.render>
        </div>,
    }
    return (
      <ElDialog
        v-slots={_slots}
        closeOnClickModal={false}
        show-close={false}
        destroy-on-close={true}
        v-model={props.modelValue}
        width={props.style?.width || '50%'}
        top={props.style?.top || '15vh'}
      >
        {
          slots && slots.default && slots.default()
        }
      </ElDialog>
    )
  }
}
