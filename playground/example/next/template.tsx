import { ElementUIForm } from '../../../fuzzy-next/impl-renderer/element-ui-renderer/ElementUIForm'
import type { OptionsConfiguration } from '../../../fuzzy-next/types'
import type { FuzzyNextHandlers } from '../../../fuzzy-next/types/handler'
export interface CustomTemplate {
  placeholder?: string
}

export const options: OptionsConfiguration<CustomTemplate> = {
  title: '这是tab111',
  api: '/safety/major-hazard',
  feature: {
    update: true,
    delete: true,
  },
  template: [
    {
      type: 'input',
      label: '企业名称',
      value: 'entName',
      placeholder: '来吧占位置',
      require: true,
      rules: [
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      visible: {
        table: true,
      },
      renderer: {
        filter: props => (<el-input v-model={props.model[props.value]}/>),
        table: props => (<div>{props.value}</div>),
        // update: props => (<el-date-picker v-model={props.model[props.value]} type="date"/>),
      },
    },
    {
      type: 'select',
      options: [
        { label: 'hhh', value: 'hhh' },
      ],
      label: '企业code',
      value: 'enterpriseCode',
      renderer: {
        table: () => <div>123hhh</div>,
      },
      visible: {
        table: true,
      },
    },
    {
      label: '级别',
      value: 'level',
      require: true,
      type: 'input',
      visible: {
        table: true,
      },
    },
    {
      label: '两重点名称',
      value: 'name',
      type: 'input',
      visible: {
        table: true,
      },
    },
  ],
}

export const options2: OptionsConfiguration<CustomTemplate> = {
  title: '这是tab2',
  api: '/safety/ent/base',
  template: [
    {
      type: 'input',
      label: '企业名2',
      value: 'entName',
      placeholder: '来吧占位置',
      visible: {
        table: true,
      },
    },
    {
      type: 'select',
      options: [
        { label: 'hhh', value: 'hhh' },
      ],
      label: '企业code',
      value: 'enterpriseCode',
      visible: {
        table: true,
      },
    },
  ],
}

// eslint-disable-next-line vue/one-component-per-file
export const UpdateComponent = defineComponent({
  props: ['row'],
  render(this) {
    console.log(this.row, '-update')
    return <div>update</div>
  },
})

const Form = new ElementUIForm()
const _Form = Form.create({
  templates: options.template,
  isHorizontal: true,
  labelPosition: 'top',
})

export const CreateComponent = () => {
  return <div class="w-full h-full flex">
    <_Form.render/>
  </div>
}

export const CreateComponent2 = defineComponent({
  setup() {
    return () => (
      <div class="w-full h-full flex">
          create 2
      </div>
    )
  },
})

export const UpdateComponent2 = defineComponent({
  props: ['row'],
  render(this) {
    console.log(this.row, '-update')
    return <div>update 2</div>
  },
})

export const handlers: FuzzyNextHandlers = {
  queryBefore: async(params) => {
    console.log('queryBefore', params)
    return params
  },
  updateBeforePop: (params) => {
    console.log('updateBeforePop', params)
  },
  deleteBefore: async(params) => {
    console.log('deleteBefore', params)

    return true
  },
  updateConfirm: async() => {
    return true
  },
  createConfirm: async() => {
    return true
    // return f.value.validate((isValid) => {
    //   if (isValid)
    //     return true
    // })
  },
}
