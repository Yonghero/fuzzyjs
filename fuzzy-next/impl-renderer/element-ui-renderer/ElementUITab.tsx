import type { TabRenderProps, TabRenderer } from '../../types'

export class ElementUITab implements TabRenderer {
  render(props: Readonly<TabRenderProps>, { emit }) {
    return (
      <div class="w-full flex items-center">
        {
          props.options.map((option, index) => {
            return (
              <div
                key={option.value}
                onClick={() => {
                  emit('update:modelValue', index)
                }}
                class={[
                  props?.modelValue === index
                    ? 'bg-primary-100 text-white'
                    : 'bg-gray-200 text-gray-700',
                  'py-3.5', 'px-8',
                  'rounded-t-lg', 'min-w-[120px]', 'flex', 'items-center', 'justify-center', 'mr-1', ' shadow-primary-50', 'cursor-pointer',
                ].join(' ')}
              >{option.label}</div>
            )
          })
        }
      </div>
    )
  }
}
