<script setup lang='ts'>
import { PolIdMappingPlugin } from './plugins'
import { handlers, mergeOp } from './template'
import SlotA from './SlotA.vue'

const mockData = {
  total: 10,
  data: [
    ...Array.from({ length: 10 }).map((_, idx) => ({ name: `因子$${idx}`, polId: 'SO2', nationalPolId: '国际编码', unit: '单位' })),
  ],
}

const size = ref('default')

const plugins = [new PolIdMappingPlugin()]

</script>

<template>
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
      :plugins="plugins"
      :size="size"
    >
      <SlotA name="slotA" />
    </Fuzzy>
  </el-config-provider>
</template>
