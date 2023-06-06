/**
 * 多tab页合并配置
 */
import { unref } from 'vue'

import type { FuzzyPluginOptions } from '../../../../types'
import { globalFormItems, installUIPlugin } from './UIPlugins'

export function mergeFuzzyOptions(...rest) {
  return rest
}

export function transferToArray(value, deep = false) {
  if (deep)
    return [unref(value)]

  if (Array.isArray(value) || Array.isArray(value[0]))
    return value.map(v => unref(v))
  if (Array.isArray(value))
    return unref(value)
  return [unref(value)]
}

export { globalFormItems }

export function use(installPlugin: (options: FuzzyPluginOptions) => void) {
  installPlugin({
    installUIPlugin,
  })
}

export * from './expose'
export * from './useActivated'
export * from './middleware'
export * from './useSlotsMap'
