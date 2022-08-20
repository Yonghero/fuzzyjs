<script lang="tsx" setup>
import { $forceUpdate, $shallowUpdate, ArcoUIRenderer, ElementUIRenderer, mergeFuzzyOptions } from '../../../fuzzy-next'
import {
  CreateComponent,
  CreateComponent2,
  UpdateComponent,
  UpdateComponent2,
  handlers,
  options,
  options2,
} from './template'
import { CustomLayoutProvider } from '~/example/next/layout-provider'
import { CustomLayoutProviderP } from '~/example/next/layout-provider-p'

const layout = new CustomLayoutProvider()
const layoutP = new CustomLayoutProviderP()

const _layout = mergeFuzzyOptions(layout, layoutP)

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
  $shallowUpdate({ current: 4 })
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
    :layout-provider="_layout"
    :options="_options"
    :handlers="handlers"
  />
</template>
