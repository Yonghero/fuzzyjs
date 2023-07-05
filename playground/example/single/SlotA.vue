<script setup lang='ts'>
import type { PropType } from 'vue'
import type { OptionsConfiguration } from '../../../types'

const props = defineProps({
  options: {
    type: Object as PropType<OptionsConfiguration>,
  },
  abc: String,
})
watchEffect(() => {
  console.log('props.options: ', props.options, props)
})

</script>

<template>
  <div class=" bg-red-500 w-20 h-10">
    slot A
  </div>
</template>

<style scoped lang='scss'>

</style>
