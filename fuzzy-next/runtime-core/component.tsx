import type { PropType } from 'vue'
import { getCurrentInstance } from 'vue'
import type {
  CreateFuzzyOptions,
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
import { workInProgressFuzzy } from './expose'

export function createComponent(globalRenderer: Renderer, globalLayoutProvider: LayoutProvider, requestProvider: RequestProvider, fuzzyOptions: CreateFuzzyOptions) {
  return defineComponent({
    props: {
      options: {
        type: Object as (PropType<OptionsConfiguration>),
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
      console.log(`%c${'-----component setup-----'}`, 'color: #008c8c')

      // 提供给用户的强制更新
      workInProgressFuzzy.forceUpdate = getCurrentInstance()?.proxy?.$forceUpdate

      const {
        modalRenderer,
        extraRenderer,
        options,
        tab,
      } = useActivated(props)

      // 根据activeOptions页面配置动态渲染
      const dynamicLayout = computed(() => {
        const components = LiftOff(props.renderer, modalRenderer.value, extraRenderer.value, props.handlers, options.value, props.mock, requestProvider, fuzzyOptions)
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
