import type { PropType } from 'vue'
import type {
  ExtraRenderer,
  FuzzyNextHandlers,
  LayoutProvider,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestProvider,
} from '../types'
import { LiftOff } from './lift-off'
import { useActivated } from './useActivated'

export function createComponent(globalRenderer: Renderer, globalLayoutProvider: LayoutProvider, requestProvider: RequestProvider) {
  return defineComponent({
    props: {
      options: {
        type: Object as (PropType<OptionsConfiguration<any>>),
        default: () => ({ template: [] }),
        required: true,
      },
      renderer: {
        type: Object as (PropType<Renderer>),
        default: () => globalRenderer,
      },
      layoutProvider: {
        type: Object as (PropType<any>),
        default: () => globalLayoutProvider,
      },
      modalRenderer: {
        type: Object as (PropType<ModalRenderer>),
        default: () => ({}),
      },
      extraRenderer: {
        type: Array as (PropType<ExtraRenderer>),
        default: () => ([]),
      },
      handlers: {
        type: Object as (PropType<FuzzyNextHandlers>),
        default: () => ({}),
      },
      mock: {
        type: Array,
        default: () => ([]),
      },
    },
    setup(props) {
      console.log(`%c${'-----component setup-----'}`, 'color: #008c8c', props)

      const {
        modalRenderer,
        extraRenderer,
        options,
        tab,
      } = useActivated(props)

      // 根据activeOptions页面配置动态渲染
      const dynamicLayout = computed(() => {
        const components = LiftOff(props.renderer, modalRenderer.value, extraRenderer.value, props.handlers, options.value, props.mock, requestProvider)
        return (
          <props.layoutProvider renderer={{ ...components, Tab: tab.value }}></props.layoutProvider>
        )
      })

      return () => (
        <>
          {
            dynamicLayout.value
          }
        </>
      )
    },
  })
}
