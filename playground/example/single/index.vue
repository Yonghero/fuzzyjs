<script setup lang='ts'>
import { handlers, mergeOp } from './template'
import SlotA from './SlotA.vue'

const mockData = {
  total: 10,
  data: [
    Array.from({ length: 10 }).map((_, idx) => ({ name: `因子$${idx}`, polId: '因子编码', nationalPolId: '国际编码', unit: '单位' })),
  ],
}

</script>

<template>
  <Fuzzy
    :options="mergeOp"
    :handlers="handlers"
    :mock="mockData"
  >
    <SlotA name="slotA" />
  </Fuzzy>
</template>
