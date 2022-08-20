import type { FormInstance } from 'element-plus'
import { ElForm, ElFormItem } from 'element-plus'
import type { VNode } from 'vue'
import { reactive, ref } from 'vue'
import type { FormCompProps, FormItem, FormRenderProps, FormRenderer, Templates } from '../../types'
import { globalFormItems } from '../../runtime-core'

export class ElementUIForm implements FormRenderer {
  isHorizontal = false
  shouldWarpEvenly = true

  create({
    templates,
    isHorizontal,
    labelPosition,
    shouldWarpEvenly,
    shouldValidate = true,
    shouldLabelWidthAuto = true,
  }: FormRenderProps) {
    this.isHorizontal = isHorizontal
    this.shouldWarpEvenly = shouldWarpEvenly === undefined
    // 获取数据模型
    const model = this.getModel(templates)
    // 获取表单项组件
    const FormItems = this.getFromItems(templates, model)
    // 获取表单项的验证规则
    const rules = shouldValidate ? this.getRules(templates) : []
    // 获取组件实例
    const formRef = ref<FormInstance>()

    return {
      render: defineComponent({
        props: ['modelValue'],
        setup(props) {
          // 附默认值
          if (props.modelValue) {
            Object.keys(props.modelValue).forEach((key) => {
              if (model[key] !== undefined)
                model[key] = props.modelValue[key]
            })
          }

          return () => (
            <>
              {
                shouldLabelWidthAuto
                  ? <ElForm
                    class="custom-el-form w-full flex flex-wrap"
                    model={model}
                    rules={rules}
                    ref={formRef}
                    label-position={labelPosition}
                    inline={isHorizontal}
                  >
                    {
                      FormItems
                    }
                  </ElForm>
                  : <ElForm
                    class="custom-el-form w-full flex flex-wrap"
                    model={model}
                    rules={rules}
                    ref={formRef}
                    label-position={labelPosition}
                    inline={isHorizontal}
                    labelWidth="100px"
                  >
                    {
                      FormItems
                    }
                  </ElForm>
              }
            </>
          )
        },
      }),
      model,
      formRef,
    }
  }

  getRules(templates: Templates[]) {
    return reactive(templates.reduce((rules, item) => {
      rules[item.value] = []
      // 必填
      if (item.require)
        rules[item.value].push({ required: true, trigger: 'change', message: `${item.label}为必填项` })
      // 其他规则
      if (item.rules)
        rules[item.value].push(...item.rules)
      return rules
    }, {}))
  }

  /**
   * 获取绑定表单的数据迷行
   * @param templates
   */
  getModel(templates: Templates[]) {
    const model = reactive({})
    templates.forEach((item) => {
      if (item.value)
        model[item.value] = item.defaultQueryValue !== undefined ? item.defaultQueryValue : ''
    })
    return model
  }

  /**
   * 根据templates 生产表单项组件
   * @param templates
   * @param model
   */
  getFromItems(templates: Templates[], model) {
    return templates.map((item) => {
      const FormItemComp = this._getFormComponent(item.type)
      return (
        <ElFormItem
          label={item.label}
          key={item.value}
          style={this.getFromStyle(item)}
          prop={item.value}
        >
          {
            item.render
              ? <item.render model={model} value={item.value}></item.render>
              : <FormItemComp {...item} model={model}/>
          }
        </ElFormItem>
      )
    })
  }

  getFromStyle(item: Templates) {
    const inlineLength = item.rowLength || 2
    const style = {
      width: (!this.isHorizontal ? `calc(100% / ${inlineLength} - 1rem)` : ''),
    }

    if (this.shouldWarpEvenly)
      style.width = `calc(100% / ${inlineLength} - 1rem)`

    const { full, width, rest, half } = item
    if (full)
      style.width = '100%'
    if (half)
      style.width = 'calc(50% - 1rem)'

    if (width)
      style.width = width.toString()
    if (!this.isHorizontal && rest)
      style.width = `calc(100% * ${inlineLength - 1} / ${inlineLength} - 1rem)`

    return style
  }

  _getFormComponent(type: FormItem) {
    const renderer = globalFormItems.get(type)
    if (renderer)
      return renderer

    const COMPS_MAP = {
      input: this.input,
      select: this.select,
      datePick: this.datePick,
    }
    return type.includes('datePicker') ? COMPS_MAP.datePick : COMPS_MAP[type]
  }

  input(props: FormCompProps) {
    const _props = computed(() => {
      const p = { ...props }
      delete p.value
      return p
    })
    return (
      <el-input
        v-model={props.model[props.value]}
        size="default"
        {..._props.value}
      />
    )
  }

  select(props: FormCompProps, { emit }): VNode {
    return (
      <el-select
        onChange={v => emit('change', props.value, v)}
        v-model={props.model[props.value]}
        {...props}
      >
        {
          props.options
          && props.options.map(item => (
            <el-option
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))
        }
      </el-select>
    )
  }

  datePick(props: FormCompProps) {
    return (
      <el-date-picker
        v-model={props.model[props.value]}
        type={props.type}
      />
    )
  }
}
