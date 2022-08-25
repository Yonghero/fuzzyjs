![](https://img.shields.io/badge/component-fuzzy-red.svg?style=for-the-badge&logo=Vue.js ) ![](https://img.shields.io/badge/npm-v8.5.2-orange?style=for-the-badge&logo=npm& )

- [Fuzzy Next](#fuzzy-next)
- [Preview](#preview)
- [Features](#features)
- [Install](#install)
- [Quick Start](#quick-start)
- [JS DOCX](#js-docx)
- [Layout Provider](#layout-provider)
- [Renderer](#renderer)
- [Http](#http)

### Fuzzy-Next

> 基于 ```vue3 ``` ```typescript``` 制作的可配置式的后台管理框架

### Features

- 根据[配置文件](#fuzzy-option)生成后台管理系统
- 系统UI可通过```Renderer```接口自定义成你想要的样式（默认提供ElementPlus、ArcoUI ）
- 页面结构可通过```Layout```接口定制成你想要的布局结构且不影响系统功能

### Preview

![image](https://github.com/Yonghero/fuzzyjs/tree/main/playground/assets/fuzzy-next.gif)

### Install

``` tsx
// main.ts

// 默认提供ElementPlus、DefaultLayoutProvider
import { DefaultLayoutProvider, ElementUIRenderer, createFuzzy } from 'fuzzy-next'

const Fuzzy = createFuzzy({
  adapters: {
    http: new DefaultRequestProvider(axiosInstance), // http adapter 需要自己实现一份 每家公司后端返回格式都不统一
    layout: new DefaultLayoutProvider(),
    renderer: new ElementUIRenderer(),
  }
})

function fuzzyInstall(App) {
  App.component('Fuzzy', Fuzzy.component())
}

// vue应用
createApp(App).use(fuzzyInstall)
```

### Quick Start

``` vue
<script lang="ts">
  import { mergeFuzzyOptions } from 'fuzzy-next'

  // 配置文件参照文档填写
  const _options: OptionsConfiguration = {}
  const _options2: OptionsConfiguration = {}
  
  // 多tab页 可调用工具函数合并配置文件
  const options = mergeFuzzyOptions(_options, _options2)
  
  // 框架操作提供的接口 参照文档填写
  // 多tab页 可调用工具函数合handlers
  const handlers = mergeFuzzyOptions(handlers1, handlers2)
  const handlers: FuzzyNextHandlers = { queryBefore: () => () }
  
</script>

<template>
  <Fuzzy
    :options="options"
    :handlers="handlers"
  />
</template>
```

### JS DOCX

[组件配置文档地址](https://github.com/Yonghero/fuzzyjs/tree/main/fuzzy-next/types)

### Fuzzy Option

```ts
export interface OptionsConfiguration {
  /**
   * 页面标题 可传递自定义渲染函数
   * 传递展示
   * 不传递 不展示标题组件
   */
  title?: string | (() => VNode)
  /**
   * 增删改查接口地址
   */
  api: string | Api | Array<string> | Array<Api>
  /**
   * 是否开启增删改查中其中一项功能
   * 默认全部开启
   */
  feature?: Feature
  /**
   * 需要展示的每个字段 可配置每个字段对应的功能
   */
  template: Templates[]

  /**
   * 对话框样式配置
   */
  modalStyle?: ModalStyleProps
  /**
   * 表格是否展示多选框
   */
  selection?: boolean
  /**
   * 表格操作栏的宽度
   */
  operateWidth?: number
  /**
   * 表格是否展示边框
   */
  border?: boolean
}



```

### Layout Provider

``` ts
// 实现以下接口 随意布局

export interface LayoutProvider {
  setup(props: Readonly<LayoutProviderProps>, context: SetupContext): () => VNode | Record<string, any>

  render?: (props: Readonly<LayoutProviderProps>) => VNode
}
export interface LayoutProviderProps {
  renderer: LayoutProviderRenderer
}

export interface LayoutProviderRenderer {
  Table: () => VNode<any>
  FilterButton: VNode<any>
  Filter: VNode<any>
  Page: VNode
  Tab: VNode
  Dialog: VNode
  CreateButton: VNode
  ExtraRenderer: ExtraRenderer
}
```

### Renderer

```ts
// 实现以下组件 随意渲染成你想要的个性化

export interface Renderer {
  table: TableRenderer
  button: ButtonRenderer
  form: FormRenderer
  dialog: DialogRenderer
  tab: TabRenderer
  page: PageRenderer
  message: MessageRender
  confirm: ConfirmRender
}

// 担心组件不够用？
const Fuzzy = createFuzzy()

// 插件机制 可扩展组件
Fuzzy.use(({ installUIPlugin }) => {

 const formItem = {
  type: 'date'
  renderer: (props: FormCompProps) => {
    return <el-date-picker
      v-model={props.model[props.value]}
      type={'date'}
    />
  },
 }

  installUIPlugin(formItem)
})

// 如何使用扩展的组件？
const options = {
   template: [
    { type: 'date' } // 此date即为你扩展的组件
   ]
} as OptionsConfiguration

<template>
   <Fuzzy :options="options">
</tempalte>

```

### http

```ts
// 用什么方式发请求? 
// 每个后端接口返回值不一致如何处理？

// 实现以下接口

export interface Response {
  data: any
  message: string
  total: number
  size: number
  success: boolean
}

export interface RequestProvider {
  get: (url: string, params?: any) => Promise<Required<Response>>
  post: (url: string, params?: any) => Promise<Pick<Response, 'message' | 'success' | 'data'>>
  delete: (url: string, params?: any) => Promise<Pick<Response, 'success' | 'message'>>
  put: (url: string, params?: any) => Promise<Pick<Response, 'message' | 'success' | 'data'>>
  implResponse(response: any): Response
}

export class DefaultRequestProvider implements RequestProvider {
  _instance: any

  constructor(instance: any) {
    this._instance = instance
  }

  delete(url: string, params: any): Promise<Pick<Response, 'success' | 'message'>> {
    return this._instance.delete(`${url}?id=${params.row.id}`)
      .then(res => this.implResponse(res.data))
  }

  get(url: string, params: any): Promise<Required<Response>> {
    return this._instance.get(
      url,
      { params: { size: 10, index: 1, ...params } },
    )
      .then(res => this.implResponse(res.data))
  }

  post(url: string, params: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    console.log('post', params)
    return Promise.resolve({
      message: '编辑成功',
      success: true,
      data: 0,
    })
  }
}


```

