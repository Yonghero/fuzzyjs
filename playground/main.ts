import axios from 'axios'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ArcoVue from '@arco-design/web-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { DefaultLayoutProvider, ElementUIRenderer, createFuzzy } from '../fuzzy-next'
import './assets/style/tailwind.css'
import './assets/style/index.scss'
import 'element-plus/dist/index.css'
import '@arco-design/web-vue/dist/arco.css'
import { DefaultRequestProvider } from '../fuzzy-next/impl-request-provider/default-request-provider'
// import { DefaultLayoutProvider, ElementUIRenderer, createFuzzy } from '../lib/fuzzy-core.es.js'
import { formItem } from '../fuzzy-next/runtime-core/extend/UIPlugings'
import App from './App.vue'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3300/api', // api的base_url
  timeout: 300000, // 请求超时时间
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJfbmFtZSI6InlvdW5naGVybyIsInNjb3BlIjpbImFwcCJdLCJuYW1lIjoi5byg5a6H6L2pIiwiaWQiOiIyMTQiLCJleHAiOjE2NDcyNzM1MDIsImlkbm8iOm51bGwsImF1dGhvcml0aWVzIjpbIk5PVEVfUEVSTUlTU0lPTiJdLCJqdGkiOiIzOWUzYWZhNC1kYTIyLTRhNDQtYjIxMC1jZTQ0OWMzYjk3NjIiLCJjbGllbnRfaWQiOiJTbWFydFBhcmtBcHAifQ.ge1ogiI6dDQJU6m3L3BdtomUnytXqcklcGuD4SZNDZJKs9taBm_md5XlUSA8_0PuEcCQaPavoCsyAxCYd5JaLJ3svXPphQG7GoZ13uAqT-tELgQIj7B7Il3tM07SeQPSUtBy3_7lNyGLyCYbTz4HXLumteakk7o2Pw4d4rWcOkY'
    return config
  })

const Fuzzy = createFuzzy({
  adapters: {
    http: new DefaultRequestProvider(axiosInstance),
    layout: new DefaultLayoutProvider(),
    renderer: new ElementUIRenderer(),
  },
  lang: {
    filter: '筛选',
  },
})

Fuzzy.use(({ installUIPlugin }) => {
  installUIPlugin(formItem)
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
