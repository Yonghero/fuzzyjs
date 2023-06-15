import { unref } from 'vue'
import type { TabRenderProps, TabRenderer } from '../../../../types'

export class ElementUITab implements TabRenderer {
  render(props: Readonly<TabRenderProps>, { emit }) {
    const Tab = () => {
      if (props.options.length === 1) {
        return (
          <div class="flex w-full items-center border-b border-solid border-b-[#EEE] dark:border-b-[#363637] ">
            <div class="w-1 h-4 mb-2 bg-[#0971FF] rounded-sm mr-2"></div>
            <h2
              class="mb-2 text-base">{typeof props.options[0].label === 'function' ? props.options[0].label() : props.options[0].label}</h2>
          </div>
        )
      }
      else {
        return (
          <div class="w-full flex items-center border-b border-solid border-b-[#EEE] dark:border-b-[#363637]">
            {
              unref(props.options).map((option, index) => {
                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      emit('update:modelValue', index)
                    }}
                    style="min-height: 2.4rem"
                    class={[
                      props?.modelValue === index
                        ? 'bg-[var(--el-color-primary)] text-white'
                        : 'bg-gray-200 text-gray-700',
                      'px-8',
                      'rounded-t-lg', 'min-w-[120px]', 'flex', 'items-center', 'justify-center', 'mr-1', ' shadow-primary-50', 'cursor-pointer',
                    ].join(' ')}
                  >{typeof option.label === 'function' ? option.label() : option.label}</div>
                )
              })
            }
          </div>
        )
      }
    }
    return (
      <Tab/>
    )
  }
}
