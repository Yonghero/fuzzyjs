import axios from 'axios'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ArcoVue from '@arco-design/web-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { DefaultLayoutProvider } from '../fuzzy-next/impl-layout-provider/default-layout-provider'
import { ArcoUIRenderer } from '../fuzzy-next/impl-renderer/arco-ui-renderer'
import { DefaultRequestProvider } from '../fuzzy-next/impl-request-provider/default-request-provider'
import { createFuzzy } from '../fuzzy-next/runtime-core'
import App from './App.vue'
import './assets/style/tailwind.css'
import './assets/style/index.scss'
import 'element-plus/dist/index.css'
import '@arco-design/web-vue/dist/arco.css'

import '../fuzzy-next/utils/index'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3301/api', // api的base_url
  timeout: 300000, // 请求超时时间
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJfbmFtZSI6InlvdW5naGVybyIsInNjb3BlIjpbImFwcCJdLCJuYW1lIjoi5byg5a6H6L2pIiwiaWQiOiIyMTQiLCJleHAiOjE2NDcyNzM1MDIsImlkbm8iOm51bGwsImF1dGhvcml0aWVzIjpbIk5PVEVfUEVSTUlTU0lPTiJdLCJqdGkiOiIzOWUzYWZhNC1kYTIyLTRhNDQtYjIxMC1jZTQ0OWMzYjk3NjIiLCJjbGllbnRfaWQiOiJTbWFydFBhcmtBcHAifQ.ge1ogiI6dDQJU6m3L3BdtomUnytXqcklcGuD4SZNDZJKs9taBm_md5XlUSA8_0PuEcCQaPavoCsyAxCYd5JaLJ3svXPphQG7GoZ13uAqT-tELgQIj7B7Il3tM07SeQPSUtBy3_7lNyGLyCYbTz4HXLumteakk7o2Pw4d4rWcOkY'
    return config
  })

const Fuzzy = createFuzzy()
  .renderer(new ArcoUIRenderer())
  .layoutProvider(new DefaultLayoutProvider())
  .requestProvider(new DefaultRequestProvider(axiosInstance))

function fuzzyInstall(App: any) {
  App.component(
    'Fuzzy',
    Fuzzy)
}

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(ArcoVue)
  .use(fuzzyInstall)
  .mount('#app')
