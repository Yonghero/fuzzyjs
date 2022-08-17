<script lang="tsx" setup>
import { mergeFuzzyOptions } from '../../../fuzzy-next/utils'
import { ArcoUIRenderer, ElementUIRenderer } from '../../../fuzzy-next/impl-renderer'
import { $forceUpdate, $shallowUpdate } from '../../../fuzzy-next/runtime-core/createFuzzy'
import {
  CreateComponent,
  CreateComponent2,
  UpdateComponent,
  UpdateComponent2,
  handlers,
  options,
  options2,
} from './template'

const _options = mergeFuzzyOptions(options, options2)

const modalRenderer = mergeFuzzyOptions(
  {
    CreateComponent,
    UpdateComponent,
  },
  {
    CreateComponent: CreateComponent2,
    UpdateComponent: UpdateComponent2,
  },
)

const isArco = ref(false)
const uiRenderer = computed(() => isArco.value ? new ArcoUIRenderer() : new ElementUIRenderer())

const onChange = () => {
  isArco.value = !isArco.value
}

const extra = [
  <button key="1">add</button>,
  <button key="2">decrease</button>,
]

const onUpdate = () => {
  $shallowUpdate()
}
const onForceUpdate = () => {
  $forceUpdate()
}
// :modal-renderer="modalRenderer"
</script>

<template>
  <el-button @click="onChange">
    换肤
  </el-button>
  <el-button @click="onUpdate">
    shallowUpdate
  </el-button>
  <el-button @click="onForceUpdate">
    forceUpdate
  </el-button>
  <Fuzzy
    :renderer="uiRenderer"
    :options="_options"
    :handlers="handlers"
  />
</template>
