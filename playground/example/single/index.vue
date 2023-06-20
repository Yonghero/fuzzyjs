<script setup lang='ts'>
import { SlotLayoutProvider } from '../../../packages/layout-provider/src/default-layout-provider/slot'
// import { PolIdMappingPlugin } from './plugins'
import { size } from '../../utils'
import { handlers, mergeOp } from './template'
import SlotA from './SlotA.vue'

const layout = new SlotLayoutProvider()

const mockData = {
  total: 50,
  data: [
    ...Array.from({ length: 20 }).map((_, idx) => ({ name: `因子$${idx}`, polId: 'SO2', nationalPolId: '国际编码', unit: '单位' })),
  ],
}

// const size = ref('default')
const darkMode = ref(false)

watch(size, (s) => {
  if (s === 'default')
    document.querySelector('html')!.style.fontSize = '14px'
  else if (s === 'small')
    document.querySelector('html')!.style.fontSize = '13px'
  else if (s === 'large')
    document.querySelector('html')!.style.fontSize = '15px'
})

watch(darkMode, (bool) => {
  if (bool)
    document.querySelector('html')!.setAttribute('class', 'dark')
  else
    document.querySelector('html')!.removeAttribute('class')
})

// const plugins = [new PolIdMappingPlugin()]

// 1. css rem html font-size

// 2. 模仿

onMounted(() => {
  // document.querySelector('html')!.setAttribute('class', 'dark')
})

</script>

<template>
  <el-config-provider :size="size">
    <div class="flex items-center gap-2">
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
      <label for="dark" class="ml-5">
        <el-switch
          v-model="darkMode"
          active-text="dark mode"
          inactive-text="light mode"
        />
      </label>
    </div>
    <Fuzzy
      :options="mergeOp"
      :handlers="handlers"
      :mock="mockData"
    >
    <!-- :layout-provider="layout" -->

    <!-- <SlotA name="slotB" /> -->
    </Fuzzy>
  </el-config-provider>
</template>

<style>

html {
  font-size: 14px;
}
</style>
