<script setup lang='ts'>
import { handlers, options } from './template'
</script>

<template>
  <Fuzzy
    :options="options"
    :handlers="handlers"
  />
</template>
