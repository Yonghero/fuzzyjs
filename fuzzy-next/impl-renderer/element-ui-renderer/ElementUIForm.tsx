import type { FormInstance } from 'element-plus'
import { ElForm, ElFormItem } from 'element-plus'
import type { VNode } from 'vue'
import { reactive, ref } from 'vue'
import type { FormCompProps, FormItem, FormRenderProps, FormRenderer, Templates } from '../../types'
import { globalFormItems } from '../../index'

export class ElementUIForm implements FormRenderer {
  isHorizontal = false
  shouldWarpEvenly = true

  create({
    templates,
    isHorizontal,
    labelPosition,
    shouldWarpEvenly = true,
    shouldValidate = true,
    shouldLabelWidthAuto = true,
    labelWidth = 100,
  }: FormRenderProps) {
    this.isHorizontal = isHorizontal
    this.shouldWarpEvenly = shouldWarpEvenly
    // 获取数据模型
    const model = this.getModel(unref(templates))
    // 获取表单项组件
    const FormItems = computed(() => this.getFromItems(unref(templates), model, shouldWarpEvenly))
    // 获取表单项的验证规则
    const rules = shouldValidate ? computed(() => this.getRules(unref(templates))) : computed(() => [])
    // 获取组件实例
    const formRef = ref<FormInstance>()

    return {
      render: defineComponent({
        props: ['modelValue', 'disabled'],
        setup(props) {
          // 附默认值
          if (props.modelValue) {
            // 如果model存在 modelValue不存在 则model[key]置空
            Object.keys(model).forEach((key) => {
              if (!props.modelValue[key])
                model[key] = ''
            })

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
                    rules={rules.value}
                    ref={formRef}
                    label-position={labelPosition}
                    inline={isHorizontal}
                    disabled={props.disabled ?? false}
                  >
                    {
                      FormItems.value
                    }
                  </ElForm>
                  : <ElForm
                    class="custom-el-form w-full flex flex-wrap"
                    model={model}
                    rules={rules.value}
                    ref={formRef}
                    label-position={labelPosition}
                    inline={isHorizontal}
                    disabled={props.disabled ?? false}
                    labelWidth={`${labelWidth}px`}
                  >
                    {
                      FormItems.value
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

  getRules(templates: Templates[] | any) {
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
  getModel(templates: Templates[] | any) {
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
   * @param shouldWarpEvenly
   */
  getFromItems(templates: Templates[] | any, model, shouldWarpEvenly) {
    return templates
      .filter(item => !item.filterUnShow)
      .map((item) => {
        const FormItemComp = this._getFormComponent(item.type)
        if (item.fetchOptions)
          item.fetchOptions()

        return (
          <ElFormItem
            label={item.label}
            key={item.value}
            style={this.getFromStyle(item, shouldWarpEvenly)}
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

  getFromStyle(item: Templates, shouldWarpEvenly) {
    const inlineLength = item.rowLength || 2
    const style = {
      width: (!this.isHorizontal ? `calc(100% / ${inlineLength} - 1rem)` : ''),
    }
    if (shouldWarpEvenly)
      style.width = `calc(100% / ${inlineLength} - 1rem)`

    const { full, width, rest, half } = item
    if (full)
      style.width = 'calc(100% - 2rem)'
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
