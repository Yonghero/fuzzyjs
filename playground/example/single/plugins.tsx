// 实现插件机制 插件可以做全局字典匹配 比如一个字段为userID, 在表格上的展示会直接通过userID匹配为userName

import type { Templates } from '../../../types'
import { RestTemplatePlugin } from '../../../types'

// 因子id映射成因子名称
export class PolIdMappingPlugin extends RestTemplatePlugin {
  install(templates: Templates[]): void {
    const mapping = [{ label: 'SO2Lable1235', value: 'SO2' }]
    injectTableRender(templates, mapping, 'polId')
  }
}

export function injectTableRender(templates, mapping, injectValue) {
  const filterTemp = templates.filter(item => item.value === injectValue)
  filterTemp.forEach((item) => {
    if (!item.renderer)
      item.renderer = {}

    item.renderer = {
      table: ({ row }) => {
        return (
          <span>{mapping.find(mapItem => mapItem.value === row[injectValue])?.label ?? '-'}</span>
        )
      },
      ...item.renderer,
    }
  })
}
