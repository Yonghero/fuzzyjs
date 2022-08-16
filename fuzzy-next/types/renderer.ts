/**
 * 组件渲染器接口
 */
import type { SetupContext } from '@vue/runtime-core'
import type { Component, Ref, VNode } from 'vue'
import type { Feature, FormTemplate, ModalStyleProps, Option, Templates } from './options'

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

/**
 * 表格渲染器接口
 */
export interface TableRenderer {
  render: (props: TableRenderProps) => (props: { data: Ref<any>; loading: Ref<boolean> }) => VNode
  getColumns: (templates: Templates[], feature: Feature | undefined) => VNode[]
  shouldFeaturesRender: (feature: Feature | undefined) => boolean

}

/**
 * 表格渲染器参数
 */
export interface TableRenderProps {
  templates: Templates[]
  feature: Feature | undefined
}

/**
 * 表格渲染器接口
 */
export type FormItemExtra<cmpName extends string, cmp extends Component> = {
  [key in cmpName]: cmp
}

export type FormCompProps = Partial<FormTemplate> & { model: any; value: any }

export interface FormRenderer extends FormItemExtra<any, any>{
  create: (props: FormRenderProps) => { render: Component | any; model: any; formRef: Ref<any> }
  getModel: (templates: Templates[]) => Record<string, any> | Ref<Record<string, any>>
  getFromItems: (templates: Templates[], model) => VNode[]
  select: (props: FormCompProps, context: SetupContext) => VNode
  input: (props: FormCompProps, context: SetupContext) => VNode
}

export interface FormRenderProps{
  templates: Templates[]
  labelPosition?: string
  feature?: Feature | undefined
  isHorizontal: boolean
  /**
   * formItem 是否换行内均分 默认开启
   */
  shouldWarpEvenly?: boolean
  /**
   * 是否启动校验规则 默认开启
   */
  shouldValidate?: boolean
}

/**
 * 按钮渲染器接口 (函数式受控组件)
 */
export interface ButtonRenderer {
  render: (props: Readonly<any>, context: SetupContext) => VNode
}

/**
 * 选项卡渲染器接口 (/**)
 */
export interface TabRenderer {
  render: (props: Readonly<TabRenderProps>, context: SetupContext) => VNode
}
export interface TabRenderProps {
  options: Option[]
  vModel: number
  modelValue?: any
}

export interface PageRenderer{
  render: (props: Readonly<PageProps>, context: SetupContext) => VNode

}
export interface PageProps {
  total: Ref<number>
  onUpdatePage?: (page: number) => void // vue emit
}

/**
 * dialog渲染器接口 (函数式受控组件)
 */

export interface DialogRenderer{
  render: (props: Readonly<DialogRenderProps>, context: SetupContext) => VNode
}
export interface DialogRenderProps {
  modelValue?: any
  title: string
  footer?: VNode[]
  style?: ModalStyleProps
  onUpdate?: (scope: any) => void // vue emit
  onCancel?: (scope: any) => void // vue emit
}

export interface MessageRender {
  success: (message) => any
  warning: (message) => any
  error: (message) => any
}

export interface ModalRenderer {
  UpdateComponent: VNode | Element | Component | JSX.Element
  CreateComponent: VNode | Element | Component | JSX.Element
}

export interface ConfirmRenderProps {
  type: 'warning' | 'error' | 'success' | 'info'
  onOk: () => void
  onCancel: () => void
  content: string
}

export interface ConfirmRender {
  render: (props: Readonly<ConfirmRenderProps>, context: SetupContext) => VNode
}
