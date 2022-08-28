import { transferToArray } from '../utils'

export function useActivated(props: any) {
  // 当前激活的下标
  const activeTabIndex = ref(0)

  // 合并options 为多tab页做准备
  const mergeOptions = computed(() => transferToArray(props.options))

  // 激活的页面配置
  const options = computed(() => mergeOptions.value[activeTabIndex.value])

  // 合并编辑、新增弹框中的组件
  const mergeModalRenderer = computed(() => transferToArray(props.modalRenderer))

  // 激活的弹窗内容
  const modalRenderer = computed(() => mergeModalRenderer.value[activeTabIndex.value])

  // 合并扩展组件
  const mergeExtraRenderer = computed(() => transferToArray(props.extraRenderer, true))

  // 激活的扩展组件
  const extraRenderer = computed(() => mergeExtraRenderer.value[activeTabIndex.value])

  // 合并布局器
  const mergeLayoutProvider = computed(() => transferToArray(props.layoutProvider))
  // 激活的布局器
  const layoutProvider = computed(() => {
    if (mergeLayoutProvider.value.length === mergeOptions.value.length)
      return markRaw(mergeLayoutProvider.value[activeTabIndex.value])
    return markRaw(mergeLayoutProvider.value[0])
  })

  // 合并处理函数
  const mergeHandlers = computed(() => transferToArray(props.handlers))

  // 激活的处理函数
  const handlers = computed(() => mergeHandlers.value[activeTabIndex.value])

  const tab = computed(() => {
    return <props.renderer.tab.render
      vModel={activeTabIndex.value}
      options={mergeOptions.value.map((i, idx) => ({ label: i.title, value: idx }))}
    />
  })

  return {
    options,
    modalRenderer,
    extraRenderer,
    layoutProvider,
    tab,
    handlers,
  }
}
