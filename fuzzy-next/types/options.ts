import type { Component, VNode } from 'vue'

/**
 * fuzzy-next supported options
 */
export type OptionsConfiguration = {
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
   * 表格是否展示序号 默认展示
   */
  No?: boolean
  /**
   * 表格是否展示多选框
   */
  selection?: boolean
  /**
   * 表单标题的统一宽度
   */
  labelWidth?: number
  /**
   * 表格操作栏的宽度
   */
  operateWidth?: number
  /**
   * 表格是否展示边框
   */
  border?: boolean
  /**
   * 表格操作栏的配置
   * @param updateRender 提供编辑组件 可任意放置位置
   * @param deleteRender 提供删除组件
   */
  operators?: (row, { UpdateRender, DeleteRender }) => Element[] | Component[] | VNode[]
} & ExtraProps

type ExtraProps = {
  [key in string]: any
}

export interface ModalStyleProps {
  width?: string | number
  top?: string
}

interface BaseTemplate {
  /**
   *  字段名称
   */
  label?: string
  /**
   *  后端需要的字段值
   */
  value: string
  /**
   * 是否在增删改查中包含此字段
   *
   */
  visible?: {
    filter?: boolean | ((row: any) => boolean)
    table?: boolean | ((row: any) => boolean)
    create?: boolean | ((row: any) => boolean)
    update?: boolean | ((row: any) => boolean)
    delete?: boolean | ((row: any) => boolean)
  }
  /**
   * 字段展示顺序
   */
  order?: {
    filter?: number
    table?: number
    create?: number
    update?: number
  }
}

export type RendererQueryProps = {
  model: any
  value: any
} & ExtraProps

export type RendererTableProps = {
  key: string
  value: any
} & ExtraProps

export interface RendererTemplate {
  renderer?: {
    filter?: (props: RendererQueryProps) => Component | Element | VNode
    table?: (props: RendererTableProps) => Component | Element | VNode
    update?: (props: RendererQueryProps) => Component | Element | VNode
    create?: (props: RendererQueryProps) => Component | Element | VNode
  }
}

/**
 * 每个字段对应的相关信息
 */
export type Templates = BaseTemplate & TableTemplate & FormTemplate & FilterTemplate & RendererTemplate & ExtraProps

/**
 * 表格模板
 */
export interface TableTemplate extends BaseTemplate {
  /**
   * 在表格中自定义展示该字段
   * 按钮的形式？
   * 给字段带点颜色？
   */
  render?(param: any): any

  /**
   * 在表格中多宽
   */
  width?: number | string
  /**
   * 超过表格宽度是否展示tooltip
   */
  showOverflowTooltip?: boolean
}

/**
 * 表单模板
 */
export interface FormTemplate extends BaseTemplate {
  /**
   * 该字段展示的表单类型 输入框？ 下拉框？ 时间选择器？
   */
  type: FormItem | any
  /**
   * 不同情况下字段展示的默认值
   */
  defaultValue?: {
    filter?: any
    update?: any
    create?: any
  }
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 表单尺寸
   */
  size?: string
  // 是否占满一行
  full?: boolean
  /**
   * 一行占几个字段
   */
  rowLength?: number
  /**
   * 是否只占一半
   */
  half?: boolean
  /**
   * 是否占满剩余空间
   */
  rest?: boolean
  /**
   * 是否多选
   */
  multiple?: boolean
  /**
   *  该字段的表单规则 参照element-plus
   */
  rules?: any[]
  /**
   * 是否必填
   */
  require?: boolean
  /**
   * type 为下拉框时的options
   */
  options?: Array<{
    label: {} | string
    value: string | number
    type?: number | string
  }>
  /**
   * 异步加载下拉框的options
   */
  fetchOptions?: (temp: Templates) => any
}

/**
 * 筛选模板
 */
export interface FilterTemplate extends BaseTemplate {
  /**
   * 在条件中的表单多宽
   */
  filterWidth?: number | string
  /**
   * 搜索栏不展示组件 仅会在请求中带上该条件
   */
  filterUnShow?: boolean
}

export type FormItem = 'input' | 'select' | 'datePicker' | 'datePickerRange'

export interface Api {
  create: string
  update: string
  delete: string
  filter: string
}

/**
 * 是否开启增删改查中其中一项功能
 */
export interface Feature {
  create?: boolean
  update?: boolean
  delete?: boolean
}

export interface Option {
  label: string
  value: any
}
