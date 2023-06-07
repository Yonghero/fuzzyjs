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

const plugins = [new PolIdMappingPlugin()]

</script>

<template>
  <Fuzzy
    :options="mergeOp"
    :handlers="handlers"
    :mock="mockData"
    :plugins="plugins"
  >
    <SlotA name="slotA" />
  </Fuzzy>
</template>
