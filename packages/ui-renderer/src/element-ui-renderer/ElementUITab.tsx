import type { TabRenderProps, TabRenderer } from '../../../../types'

export class ElementUITab implements TabRenderer {
  render(props: Readonly<TabRenderProps>, { emit }) {
    const Tab = () => {
      if (props.options.length === 1) {
        return (
          <div class="flex w-full items-center" style="border-bottom: 1px solid #EEEEEE">
            <div class="w-1 h-4 mb-2 bg-primary-100 rounded-sm mr-2"></div>
            <h2
              class="mb-2 text-base">{typeof props.options[0].label === 'function' ? props.options[0].label() : props.options[0].label}</h2>
          </div>
        )
      }
      else {
        return (
          <div class="w-full flex items-center" style="border-bottom: 1px solid #EEEEEE">
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
                        ? 'bg-primary-100 text-white'
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
