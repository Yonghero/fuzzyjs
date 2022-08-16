import type { PropType } from 'vue'
import type { LayoutProvider, LayoutProviderRenderer } from '../../types'

export class DefaultLayoutProvider implements LayoutProvider {
  props = {
    renderer: {
      type: Object as PropType<LayoutProviderRenderer>,
    },
  }

  setup(props) {
    return () => (
      <div class="w-full p-10">
        <div>
          { props.renderer.Tab }
        </div>
        <div class="flex flex-nowrap justify-between items-center">
          <div class="flex flex-shrink-0 flex-nowrap pt-6 pb-2 items-start justify-between gap-x-3">
            {props.renderer.Filter}
            {props.renderer.FilterButton}
          </div>
          { props.renderer.CreateButton}
        </div>

        <div class="relative top-100">
          { props.renderer.Table }
        </div>
        <div class="w-full flex items-center justify-center mt-10">
          { props.renderer.Page }
        </div>
        { props.renderer.Dialog }
      </div>
    )
  }
}
