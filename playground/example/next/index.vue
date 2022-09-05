<script lang="tsx" setup>
import { $forceUpdate, $shallowUpdate, ArcoUIRenderer, ElementUIRenderer, mergeFuzzyOptions } from '../../../fuzzy-next'
import { mapTemplateOfOrder } from '../../../fuzzy-next/utils'
import { ElementUIButton } from '../../../fuzzy-next/impl-renderer/element-ui-renderer/ElementUIButton'
import {
  CreateComponent,
  CreateComponent2,
  UpdateComponent,
  UpdateComponent2,
  changed,
  handlers,
  handlers1,
  options,
  options2,
  options3,
} from './template'
import { CustomLayoutProvider } from '~/example/next/layout-provider'
import { CustomLayoutProviderP } from '~/example/next/layout-provider-p'

const layout = new CustomLayoutProvider()
const layoutP = new CustomLayoutProviderP()

const button = new ElementUIButton()

const _layout = mergeFuzzyOptions(layout, layoutP)

const _options = mergeFuzzyOptions(options, options)

const _h = mergeFuzzyOptions(handlers, handlers1)

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

const mergeExtra = extra

const onChangeTitle = () => {
  changed.value = '被我改变了'
}
const onUpdate = () => {
  $shallowUpdate({ current: 2 })
}
const onForceUpdate = () => {
  $forceUpdate()
}
</script>

<template>
  <button.render type="operate" @click="onChange">
    换肤
  </button.render>
  <el-button @click="onUpdate">
    shallowUpdate
  </el-button>
  <el-button @click="onForceUpdate">
    forceUpdate
  </el-button>
  <el-button @click="onChangeTitle">
    动态改变标题
  </el-button>
  <Fuzzy
    :renderer="uiRenderer"
    :options="_options"
    :handlers="_h"
    :layout-provider="layout"
    :extra-renderer="mergeExtra"
  />
</template>
