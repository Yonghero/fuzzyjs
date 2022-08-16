![](https://img.shields.io/badge/component-fuzzy-red.svg?style=for-the-badge&logo=Vue.js ) ![](https://img.shields.io/badge/npm-v8.5.2-orange?style=for-the-badge&logo=npm& )


- [Vue-Fuzzy](#vue-fuzzy)
- [Install](#install)
- [Quick Start](#quick-start)
- [JS DOCX](#js-docx)
- [Config](#config)


### Vue-Fuzzy

> 基于 vue3 | ts | element-plus | windcss 制作的一个的用于后台管理系统、
> 可通过配置提供增删改查一站式服务的组件

### Install
``` tsx
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import axios from 'axios'
import 'windi.css'
import { FuzzyInstall } from 'vue-fuzzy'
import App from './App.vue'

const axiosInstance = axios.create()


createApp(App)
  .use(ElementPlus)
  .use(FuzzyInstall, {
    componentName: 'VueFuzzy' // 可自定义组件名称
    request: axiosInstance, // 请求实例
    implResponse: (response: any): ResponseHandler => ({ // map响应对象
      data: response.data.data,
      success: response.status === 200,
      total: response.data.total,
    } as FuzzyOptions),
  })
  .mount('#app')
```

### Quick Start

``` vue
<template>
  <Fuzzy :config="config"/>
</template>

<script lang="ts">
import config from "./config.ts"
</script>
```
![image](https://github.com/Yonghero/vue-fuzzy/blob/main/playground/assets/live.gif)


### JS DOCX

[文档地址](https://github.com/Yonghero/vue-fuzzy/blob/main/core/Fuzzy/types/index.ts)

![image](https://github.com/Yonghero/vue-fuzzy/blob/main/playground/assets/fuzzy-docs.gif)


### Config

``` ts

import { FormItemEnum } from './types'

// 单页面配置
// 具体字段配置信息 查看 js docx
const config: TemplateConfiguration = [
  api: 'v1.api',
  title: 'Fuzzy',
  feature: { create: true, delete: true, update: true },
  pagination: {
    size: 10,
  },
  templates: [
    {
      label: '序号',
      value: 'serialNumber',
      visible: {
        table: true,
      },
    },
    {
      label: '姓名',
      value: 'name',
      defaultQueryValue: '我叫fuzzy',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
      render: (row: any) => h('div', { style: 'color: red' }, [row.$index]),
    },
    {
      label: '爱好',
      value: 'hobby',
      type: FormItemEnum.select,
      items: [{ label: '默认', value: 'initial'}],
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
      fetchQuery() { // 支持异步加载items
        setTimeout(() => {
          this.items.push(...[{ label: '打篮球', value: 'bk' }, { label: '踢足球', value: 'bk' }])
        }, 500)
      },
    },
    {
      label: '时间',
      value: 'time',
      type: FormItemEnum.datePicker,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
  ],
  tableOperation: {
    show: true,
    operator: [
      {
        label: '自定义',
        value: 'diy',
        onClick: (row: any) => {
          console.log('自定义按钮', row)
        },
      },
    ],
  },
]

```
