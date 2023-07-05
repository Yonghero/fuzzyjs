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
      <div class="relative h-full w-full p-2">
        {props.renderer.Tab}
        <div class="flex flex-nowrap items-center justify-between">
          <div class="shrink-1 flex flex-nowrap items-start justify-between gap-x-2 pt-4">
            {props.renderer.Filter}
            {props.renderer.FilterButton}
          </div>
          <div class="shrink-1 flex gap-x-2">
            {
              props.renderer?.ExtraRenderer?.map((renderer, index) => (<renderer key={index}/>))
            }
            {props.renderer.CreateButton}
          </div>
        </div>
        <div class="flex flex-col gap-y-1" style="height: calc(100% - 90px)">
          <div class="flex-auto">
            {props.renderer.Table}
          </div>
          <div class="flex w-full items-center justify-center">
            {props.renderer.Page}
          </div>
        </div>

        {props.renderer.Dialog}
      </div>
    )
  }
}
