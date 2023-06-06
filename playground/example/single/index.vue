<script setup lang='ts'>
import { handlers, options } from './template'
const mockData = {
  total: 10,
  data: [
    Array.from({ length: 10 }).map((_, idx) => ({ name: `因子$${idx}`, polId: '因子编码', nationalPolId: '国际编码', unit: '单位' })),
  ],
}
</script>

<template>
  <Fuzzy
    :options="options"
    :handlers="handlers"
    :mock="mockData"
  />
</template>
