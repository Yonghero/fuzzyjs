# features

## inject  ``` <slot/> ```  (注入自定义插槽组件 高度自自定义化)

``` tsx
// MyComponent.vue

<script setup lang='ts'>
import type { PropType } from 'vue'
import type { OptionsConfiguration } from '../../../types'

// 注入的组件都将接收到fuzzy的options
const props = defineProps({
  options: {
    type: Object as PropType<OptionsConfiguration>,
  },
})

watchEffect(() => {
  console.log('props.options: ', props.options, props)
})
</script>

<template>
  <div class=" bg-red-500 w-20 h-10">
   MyComponet
  </div>
</template>

<style scoped lang='scss'>

</style>
```

``` tsx
// index.vue 
// 插槽组件注入

<Fuzzy 
  :options="options" 
  :layoutProvider="SlotLayoutProvider"
>
  <MyComponent name="MyComp"/>
</Fuzzy>

// LayoutProvider.tsx
export class SlotLayoutProvider implements LayoutProvider {

  props = {
    renderer: {
      type: Object as PropType<LayoutProviderRenderer>,
    },
    MyComp: { // prop 名称为注入组件的name属性
      type: Object as PropType<Component>,
    },
  }


  setup() {
    return () => (
     <div class="w-full h-full p-2">
        // 可以将你注入的组件与Fuzzy融合 一般搭配Tree组件进行查询联动
        <props.MyComp></props.MyComp>
        <div>
          {props.renderer.Tab}
        </div>
        <div class="flex flex-nowrap justify-between items-center">
          ....
        </div>
      </div>
    )
  }
}
```
## 组件全局配置无需通过函数参数传递 直接改为import 不影响功能咱不实现

## 实现插件机制 插件可以做全局字典匹配 比如一个字段为userID, 在表格上的展示会直接通过userID匹配为userName

<!-- ## 如果配置存在items字典表，表格字段的展示直接匹配 无需重新renderer手动匹配 -->
