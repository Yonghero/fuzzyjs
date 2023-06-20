import type { PropType } from 'vue'
import type { FuzzySize, LayoutProvider, LayoutProviderRenderer } from '../../../../types'

export class DefaultLayoutProvider implements LayoutProvider {
  props = {
    renderer: {
      type: Object as PropType<LayoutProviderRenderer>,
    },
    size: {
      type: String as PropType<FuzzySize>,
    },
  }

  setup(props) {
    // 布局提供器
    // 自定义放置框架组件 可扩展其他组件
    return () => (
      <div class="w-full h-full p-2 flex flex-col flex-auto">
        <div>
          {props.renderer.Tab}
        </div>
        <div class="flex flex-nowrap justify-between items-center">
          <div class="flex flex-nowrap flex-shrink-1 pt-4 items-start justify-between gap-x-2">
            {props.renderer.Filter}
            {props.renderer.FilterButton}
          </div>
          <div class="flex gap-x-2 flex-shrink-1">
            {
              props.renderer?.ExtraRenderer?.map((renderer, index) => (<renderer key={index}/>))
            }
            {props.renderer.CreateButton}

          </div>
        </div>

        <div class="relative flex-auto flex flex-col gap-y-1">
          {props.renderer.Table}
          <div class="w-full flex items-center justify-end">
            {props.renderer.Page}
          </div>
        </div>

        {props.renderer.Dialog}
        {/* <div class="flex-auto fixed bottom-12 w-full">
          {props.renderer.Table}
        </div>
        <div class="w-full flex items-center justify-center fixed bottom-1">
          {props.renderer.Page}
        </div> */}
      </div>
    )
  }
}
