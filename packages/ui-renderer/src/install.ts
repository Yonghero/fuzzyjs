import type { ExtendFormItem } from '../../../types'

export const globalFormItems = new Map()

export function installUIPlugin(items: ExtendFormItem[] | ExtendFormItem) {
  if (Array.isArray(items)) {
    for (const item of items)
      globalFormItems.set(item.type, item.renderer)
  }
  else {
    globalFormItems.set(items.type, items.renderer)
  }
}
