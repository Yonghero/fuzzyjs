/**
 * 组件渲染器接口
 */
import type { SetupContext } from 'vue'
import type { Component, Ref, VNode } from 'vue'
import type { ComputedRef } from 'vue-demi'
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
  render: (props: TableRenderProps) => (props: { data: Ref<any>; loading: Ref<boolean>; border: boolean; onSelectionChange: (p) => any }) => VNode
  getColumns: (templates: Templates[], feature: Feature | undefined) => VNode[]
  shouldFeaturesRender: (feature: Feature | undefined) => boolean

}

/**
 * 表格渲染器参数
 */
export interface TableRenderProps {
  templates: Templates[]
  feature: Feature | undefined
  selection?: boolean
  showSummary?: boolean
  summaryMethod?: any
}

/**
 * 表格渲染器接口
 */
export type FormItemExtra<cmpName extends string, cmp extends Component> = {
  [key in cmpName]: cmp
}

export type FormCompProps = Partial<FormTemplate> & { model: any; value: any }

export interface FormRenderer extends FormItemExtra<any, any> {
  create: (props: FormRenderProps) => { render: Component | any; model: any; formRef: Ref<any> }
  getModel: (templates: Templates[]) => Record<string, any> | Ref<Record<string, any>>
  getFromItems: (templates: Templates[], model, shouldWarpEvenly) => VNode[]
  select: (props: FormCompProps, context: SetupContext) => VNode
  input: (props: FormCompProps, context: SetupContext) => VNode
}

export interface FormRenderProps {
  templates: Templates[] | Ref<Templates[]> | ComputedRef<Templates[]>
  labelPosition?: string
  labelWidth?: number
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
  /**
   * 是否开启标签宽度自适应 默认开启
   */
  shouldLabelWidthAuto?: boolean
  /**
   * 是否移除表单模型的空值
   */
  shouldRemoveModelUndefined?: boolean
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

export interface PageRenderer {
  render: (props: Readonly<PageProps>, context: SetupContext) => VNode
}

export interface PageProps {
  total: Ref<number>
  // modelValue: Ref<number>
  // onUpdateModelValue?: (page: number) => void // vue emit
}

/**
 * dialog渲染器接口 (函数式受控组件)
 */

export interface DialogRenderer {
  render: (props: Readonly<DialogRenderProps>, context: SetupContext) => VNode
}

export interface DialogRenderProps {
  modelValue?: any
  title: string | VNode | Function | Element | Component | JSX.Element | any
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

export type ExtraRenderer = Component[] | Element[] | VNode[]

export interface ConfirmRenderProps {
  type: 'warning' | 'error' | 'success' | 'info'
  onOk: () => void
  onCancel: () => void
  content: string
}

export interface ConfirmRender {
  render: VNode | Component | Element
}

export interface ExtendFormItem {
  type: string
  renderer: (props: FormCompProps) => Component | Element | VNode
}
