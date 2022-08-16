import type { ExtendFormItem } from '../../types'

export const globalFormItems = new Map()

export function UIPlugins(items: ExtendFormItem[]) {
  for (const item of items)
    globalFormItems.set(item.type, item.renderer)
}

// const formItem = {
//   type: 'date',
//   renderer: (props: FormCompProps) => {
//     return <el-date-picker
//       v-model={props.model[props.value]}
//       type={'date'}
//     />
//   },
// }
