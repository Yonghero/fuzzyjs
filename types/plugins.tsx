
import type { Templates } from './options'

// export interface RestTemplatePlugin {
//   install(templates: Templates, options: OptionsConfiguration): void
// }

export abstract class RestTemplatePlugin {
  abstract install(templates: Templates[]): void

  uuid = ''
}

// 实现插件机制 插件可以做全局字典匹配 比如一个字段为userID, 在表格上的展示会直接通过userID匹配为userName
export class DictMappingPlugin extends RestTemplatePlugin {
  install(templates: Templates[]): void {
    // const values = ['polId']
    const factorMapper = [
      { label: 'SO2123 ', value: 'SO2' },
    ]

    const filterTemp = templates.filter(item => item.value === 'polId')

    filterTemp.forEach((item) => {
      if (item.renderer) {
        item.renderer = {
          table: ({ row }) => (
            <span>{factorMapper.find(factor => factor.value === row.polId)?.label ?? '-'}</span>
          ),
          ...item.renderer,
        }
      }
    })
  }
}
