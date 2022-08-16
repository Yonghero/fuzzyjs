import { TabPane, Tabs } from '@arco-design/web-vue'
import type { TabRenderProps, TabRenderer } from '../../types'

export class ArcoUITab implements TabRenderer {
  render(props: Readonly<TabRenderProps>, { emit }) {
    return (
      <Tabs
        default-active-key={'1'}
        active-key={props.modelValue}
        onTabClick={(index) => {
          emit('update:modelValue', index)
        }}
      >
        {
          props.options.map((item) => {
            return (
              <TabPane title={item.label} key={item.value}/>
            )
          })
        }
      </Tabs>
    )
  }
}
