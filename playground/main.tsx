import axios from 'axios'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ArcoVue from '@arco-design/web-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// import './assets/style/tailwind.css'
// import '@arco-design/web-vue/dist/arco.css'
// import { DefaultLayoutProvider } from '../packages/layout-provider/dist/@fuzzy-next/layout-provider.es.js'
// import { ElementUIRenderer } from '../packages/ui-renderer/dist/@fuzzy-next/ui-renderer.es.js'
// import { DefaultRequestProvider } from '../packages/request-provider/dist/@fuzzy-next/request-provider.es.js'
// import { createFuzzy } from '../packages/fuzzy-next/dist/fuzzy-next.es.js'
import { DefaultLayoutProvider } from '../packages/layout-provider/index.ts'
import { ElementUIRenderer, installUIPlugin } from '../packages/ui-renderer/index.ts'
import { DefaultRequestProvider } from '../packages/request-provider/index.ts'
import { createFuzzy } from '../packages/fuzzy-next/index.ts'
import type { FormCompProps } from '../types/renderer.ts'
import { PolIdMappingPlugin } from './example/single/plugins.tsx'
import App from './App.vue'
// import './assets/style/index.scss'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/style/element/index.scss'

import { size } from './utils/index.ts'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3300/api', // api的base_url
  timeout: 300000, // 请求超时时间
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJfbmFtZSI6InlvdW5naGVybyIsInNjb3BlIjpbImFwcCJdLCJuYW1lIjoi5byg5a6H6L2pIiwiaWQiOiIyMTQiLCJleHAiOjE2NDcyNzM1MDIsImlkbm8iOm51bGwsImF1dGhvcml0aWVzIjpbIk5PVEVfUEVSTUlTU0lPTiJdLCJqdGkiOiIzOWUzYWZhNC1kYTIyLTRhNDQtYjIxMC1jZTQ0OWMzYjk3NjIiLCJjbGllbnRfaWQiOiJTbWFydFBhcmtBcHAifQ.ge1ogiI6dDQJU6m3L3BdtomUnytXqcklcGuD4SZNDZJKs9taBm_md5XlUSA8_0PuEcCQaPavoCsyAxCYd5JaLJ3svXPphQG7GoZ13uAqT-tELgQIj7B7Il3tM07SeQPSUtBy3_7lNyGLyCYbTz4HXLumteakk7o2Pw4d4rWcOkY'
    return config
  })

axiosInstance.interceptors.response.use((response) => {
  return response.data
})

const Fuzzy = createFuzzy({
  adapters: {
    http: new DefaultRequestProvider(axiosInstance),
    layout: new DefaultLayoutProvider(),
    renderer: new ElementUIRenderer(),
    paging: {
      current: 'index',
      size: 'size',
    },
  },
  lang: {
    filter: '查询',
  },
  message: {
    deleteSuccess: '删除成功',
    success: '成功',
  },
  size,
  plugins: [new PolIdMappingPlugin()],
})

installUIPlugin({
  type: 'textarea',
  renderer: (props: FormCompProps) => {
    return <el-input
      size={props.size}
      v-model={props.model[props.value]}
      type="textarea"
      placeholder="请输入"
    />
  },
})

installUIPlugin({
  type: 'input',
  renderer: (props: FormCompProps) => {
    return <el-input
      v-model={props.model[props.value]}
      placeholder="请输入"
      disabled={!!props.disabled}
      size={props.size}
    />
  },
})

installUIPlugin({
  type: 'select',
  renderer: (props: FormCompProps) => {
    return <el-select
      v-model={props.model[props.value]}
      size={props.size}
      placeholder="请选择"
      onChange={(value) => {
        if (props.onChange)
          props.onChange({ value, model: props.model, key: props.value })
      }}
      {...props}
    >
      {
        props.options
          && unref(props.options).map(item => (
            <el-option
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))
      }
    </el-select>
  },
})

function fuzzyInstall(App: any) {
  App.component(
    'Fuzzy',
    Fuzzy.component())
}

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(ArcoVue)
  .use(fuzzyInstall)
  .mount('#app')
