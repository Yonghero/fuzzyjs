<script setup lang='ts'>
import { SlotLayoutProvider } from '../../../packages/layout-provider/src/default-layout-provider/slot'
// import { PolIdMappingPlugin } from './plugins'
import { handlers, mergeOp } from './template'
import SlotA from './SlotA.vue'

const layout = new SlotLayoutProvider()

const mockData = {
  total: 10,
  data: [
    ...Array.from({ length: 10 }).map((_, idx) => ({ name: `因子$${idx}`, polId: 'SO2', nationalPolId: '国际编码', unit: '单位' })),
  ],
}

const size = ref('default')

// const plugins = [new PolIdMappingPlugin()]

// 1. css rem html font-size

// 2. 模仿

</script>

<template>
  <layout-provider :size="size">
    <Menu />
  </layout-provider>
  <el-config-provider :size="size">
    <el-radio-group v-model="size">
      <el-radio label="small">
        small
      </el-radio>
      <el-radio label="default">
        default
      </el-radio>
      <el-radio label="large">
        large
      </el-radio>
    </el-radio-group>
    <Fuzzy
      :options="mergeOp"
      :handlers="handlers"
      :mock="mockData"
      :size="size"
      :layout-provider="layout"
    >
      <SlotA name="slotB" />
    </Fuzzy>
  </el-config-provider>
</template>
