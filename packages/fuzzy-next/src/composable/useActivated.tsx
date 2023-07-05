import { computed, markRaw, ref, unref } from 'vue'
import { transferToArray } from '../extend'

const isDeep = arr => arr.some(item => item instanceof Array)

export function useActivated(props) {
  const _p = unref(props)
  // 当前激活的下标
  const activeTabIndex = ref(0)

  // 合并options 为多tab页做准备
  const mergeOptions = computed(() => transferToArray(_p.options))

  // 激活的页面配置
  const options = computed(() => mergeOptions.value[activeTabIndex.value])

  // 合并编辑、新增弹框中的组件
  const mergeModalRenderer = computed(() => transferToArray(_p.modalRenderer))

  // 激活的弹窗内容
  const modalRenderer = computed(() => mergeModalRenderer.value[activeTabIndex.value])

  // 合并扩展组件
  const mergeExtraRenderer = computed(() => {
    if (isDeep(_p.extraRenderer)) {
      return _p.extraRenderer
    }
    else {
      return Array.from({ length: mergeOptions.value.length }).map((_, idx) => {
        if (idx === 0)
          return _p.extraRenderer

        return undefined
      })
    }
  })
  // 激活的扩展组件
  const extraRenderer = computed(() => mergeExtraRenderer.value[activeTabIndex.value])

  // 合并布局器
  const mergeLayoutProvider = computed(() => transferToArray(_p.layoutProvider))
  // 激活的布局器
  const layoutProvider = computed(() => {
    if (mergeLayoutProvider.value.length === mergeOptions.value.length)
      return markRaw(mergeLayoutProvider.value[activeTabIndex.value])
    return markRaw(mergeLayoutProvider.value[0])
  })

  // 合并处理函数
  const mergeHandlers = computed(() => transferToArray(_p.handlers))

  // 激活的处理函数
  const handlers = computed(() => mergeHandlers.value[activeTabIndex.value])

  const tab = computed(() => {
    return <_p.renderer.tab.render
      vModel={activeTabIndex.value}
      options={mergeOptions.value.map((i, idx) => ({
        label: i.titleRenderer ? i.titleRenderer() : unref(i.title),
        value: idx,
      }))}
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
