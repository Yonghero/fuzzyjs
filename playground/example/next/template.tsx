import { ElementUIForm } from '../../../fuzzy-next/impl-renderer/element-ui-renderer/ElementUIForm'
import type { FuzzyNextHandlers, OptionsConfiguration } from '../../../fuzzy-next/types'

export const options: OptionsConfiguration = {
  title: '标题一',
  api: {
    filter: '/safety/ent/base',
    update: '/safety/ent/base',
    create: '/safety/ent/base',
    delete: '/safety/ent/base',
  },
  labelWidth: 120,
  feature: {
    update: true,
    delete: true,
  },
  selection: true,
  template: [
    {
      type: 'date',
      label: '企业名称',
      value: 'entName',
      placeholder: '来吧占位置',
      defaultValue: {
        filter: '特',
        create: 'hhh',
      },
      order: {
        filter: 2,
        table: 3,
      },
      require: true,
      rules: [
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      visible: {
        table: true,
        filter: true,
      },
      renderer: {
        // filter: props => (<el-input v-model={props.model[props.value]}/>),
        table: props => (<div class="text-red-500">{props.value}</div>),
      },
    },
    {
      type: 'select',
      options: [
        { label: 'hhh', value: 0 },
      ],
      label: '企业code',
      value: 'enterpriseCode',
      defaultValue: {
        create: 0,
        update: 0,
      },
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
      placeholder: '来吧占位置',
      type: 'input',
      visible: {
        table: true,
        filter: true,
      },
    },
    {
      label: '两重点名称',
      value: 'name',
      type: 'input',
      order: {
        filter: 4,
      },
      visible: {
        table: true,
      },
    },
    {
      label: '两重点名称22',
      value: 'name1',
      type: 'input',
      visible: {
        table: true,
      },
    },
    {
      label: '站点类型',
      value: 'subType',
      filterUnShow: true,
      defaultValue: {
        filter: 1,
      },
      visible: {
        table: false,
        update: false,
        create: false,
      },
      type: 'input',
    },
  ],
  operateWidth: 280,
  operators: (scope, { UpdateRender, DeleteRender }) => {
    // eslint-disable-next-line react/jsx-key
    return [<div>diy</div>, DeleteRender, UpdateRender]
  },
}

export const options3 = {
  title: '数据标记',
  api: {
    filter: '/safety/ent/base',
    update: '/safety/ent/base',
    create: '/safety/ent/base',
    delete: '/safety/ent/base',
  },
  template: [
    {
      label: '名称',
      type: 'input',
      value: 'name',
      require: true,
    },
    {
      label: '编码',
      type: 'input',
      value: 'code',
      require: true,
    },
    {
      label: '解析值',
      type: 'input',
      value: 'trans',
      require: true,
    },
    {
      label: '正常标志',
      type: 'select',
      value: 'normal',
      require: true,
      options: [{ label: '是', value: 0 }, { label: '否', value: 1 }],
    },
    {
      label: '描述',
      type: 'input',
      value: 'remark',
    },
    {
      label: '系统类型',
      value: 'dataType',
      type: 'input',
      // filterUnShow: true,
      defaultValue: {
        filter: 1,
      },
    },
  ],
}
export const options2: OptionsConfiguration = {
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
        filter: true,
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
    return params.data
  },
  updateBeforePop: async(params) => {
    console.log('updateBeforePop', params)
    return params.data
  },
  deleteBefore: async(params) => {
    console.log('deleteBefore', params)

    return true
  },
  updateConfirm: async() => {
    return true
  },
  selectionChange: (selection) => {
    console.log('selectionChange', selection)
  },
  createConfirm: async() => {
    return true
    // return f.value.validate((isValid) => {
    //   if (isValid)
    //     return true
    // })
  },
}
