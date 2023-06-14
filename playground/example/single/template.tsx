import { mergeFuzzyOptions } from '../../../packages/fuzzy-next/src/extend'
import type { FuzzyNextHandlers, OptionsConfiguration } from '../../../types'

const r1 = ref(true)

export const options: OptionsConfiguration = {
  title: '因子信息',
  api: '/environ/factor/list',
  template: [
    {
      label: '因子名称',
      value: 'name',
      type: 'input',
      require: false,
    },
    {
      label: '因子编码',
      value: 'polId',
      type: 'input',
      visible: {
        table: true,
      },
      require: r1,
    },
    {
      label: '下拉测试',
      value: 'select',
      type: 'select',
      options: [{ label: 1, value: 1 }],
      onChange({ value }) {
        if (value)
          r1.value = !r1.value
      },
      visible: {
        filter: false,
      },
    },
    {
      label: '国际编码',
      value: 'nationalPolId',
      type: 'input',
      visible: {
        filter: false,
      },
    },
    {
      label: '单位',
      value: 'unit',
      type: 'input',
      require: false,
      visible: {
        filter: false,
      },
    },
    {
      label: '小数位数',
      value: 'valPrecision',
      type: 'input',
      require: false,
      visible: {
        filter: false,
      },
    },
    {
      label: '系统站点类型',
      value: 'dataType',
      type: 'input',
      filterUnShow: true,
      visible: {
        table: false,
      },
      defaultValue: {
        filter: 1,
      },
    },
  ],
}

export const mergeOp = mergeFuzzyOptions(options, { ...options, title: '因子信息2' })

export const handlers: FuzzyNextHandlers = {
  queryBefore: async({ data }) => {
    console.log('queryBefore')
    return data
  },
}
