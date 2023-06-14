import { ref } from 'vue'
import type { DataProvider } from '../core/createDataProvide'
import type { FuzzySize } from '../../../../types'

/**
 * 该文件暴露调用内部数据和方法, 可以在外部调用更加灵活处理
 */

export const workInProgressFuzzy: any = {
  forceUpdate: () => undefined,
  shallowUpdate: (p?: any) => p,
  dataProvider: ref<DataProvider>(),
}

/**
 * 强制该组件重新渲染
 */
export function $forceUpdate() {
  if (workInProgressFuzzy.forceUpdate)
    workInProgressFuzzy.forceUpdate()
}

/**
 * 只重新请求组件数据，不重新渲染
 */
export async function $shallowUpdate(params = {}) {
  if (workInProgressFuzzy.shallowUpdate)
    return await workInProgressFuzzy.shallowUpdate(params)
}

export function $insideReactiveValue() {
  return workInProgressFuzzy.dataProvider.value.value
}

/**
 * 组件尺寸
 */
export const FuzzyComponentSize = ref<FuzzySize>('default')
