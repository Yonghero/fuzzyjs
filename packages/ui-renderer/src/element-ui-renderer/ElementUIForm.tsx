import type { FormInstance } from 'element-plus'
import { ElForm, ElFormItem } from 'element-plus'
import type { PropType } from 'vue'
import { computed, defineComponent, reactive, ref, unref, watch } from 'vue'
import type { FormItem, FormRenderer, Templates } from '../../../../types'
import { globalFormItems } from '../install'

export class ElementUIForm implements FormRenderer {
  create() {
    // 获取组件实例
    const formRef = ref<FormInstance>()
    const getRules = this.getRules
    const getFromItems = this.getFromItems
    const getModel = this.getModel

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    const formModel = ref({})

    return {
      render: defineComponent({
        props: {
          templates: {
            type: Array as PropType<Templates[]>,
            default: () => [],
          },
          shouldValidate: { // 是否校验
            type: Boolean,
            default: true,
          },
          shouldLabelWidthAuto: {
            type: Boolean,
            default: false,
          },
          shouldWarpEvenly: {
            type: Boolean,
            default: true,
          },
          isHorizontal: {
            type: Boolean,
            default: false,
          },
          labelPosition: {
            type: String,
            default: 'right',
          },
          labelWidth: {
            type: [String, Number],
            default: 100,
          },
          modelValue: { // 表单绑定的数据
            type: Object,
            default: () => ({}),
          },
          disabled: { // 是否禁用
            type: Boolean,
            default: false,
          },
          shouldRemoveModelUndefined: {
            type: Boolean,
            default: false,
          },
        },
        setup(props) {
          // 获取表单项的验证规则
          const rules = props.shouldValidate ? computed(() => getRules(unref(props.templates))) : computed(() => [])
          // rules 动态修改后 需手动清楚校验
          watch(rules, () => {
            setTimeout(() => {
              formRef.value?.clearValidate()
            }, 100)
          })

          // 获取数据模型
          const model = getModel(unref(props.templates))

          // 获取表单项组件
          const FormItems = computed(() => getFromItems(unref(props.templates), model, props.shouldWarpEvenly, props.isHorizontal, _this))

          // 附默认值
          // if (props.shouldRemoveModelUndefined) {
          //   const rModel = getModel(unref(props.templates))
          //   Object.keys(rModel).forEach((key) => {
          //     model[key] = rModel[key]
          //   })
          // }

          if (props.modelValue) {
            Object.keys(props.modelValue).forEach((key) => {
              model[key] = props.modelValue[key]
            })
          }

          formModel.value = model

          const expandProps = {} as Record<string, any>
          // 表单label是否自适应
          if (!props.shouldLabelWidthAuto)
            expandProps.labelWidth = `${props.labelWidth}px`

          return () => (
            <>
              <ElForm
                class="custom-el-form w-full flex flex-wrap"
                model={model}
                rules={rules.value}
                ref={formRef}
                label-position={props.labelPosition}
                inline={props.isHorizontal}
                disabled={props.disabled ?? false}
                {...expandProps }
              >
                {
                  FormItems.value
                }
              </ElForm>
            </>
          )
        },
      }),
      formRef,
      formModel,
    }
  }

  getRules(templates: Templates[] | any) {
    const rules = reactive(templates.reduce((rules, item) => {
      rules[item.value] = []
      // 必填
      if (unref(item.require))
        rules[item.value].push({ required: true, trigger: ['blur', 'change'], message: `${item.label}为必填项` })
      // 其他规则
      if (item.rules)
        rules[item.value].push(...item.rules)
      return rules
    }, {}))
    return rules
  }

  /**
   * 获取绑定表单的数据迷行
   * @param templates
   */
  getModel(templates: Templates[] | any) {
    const model = reactive({})
    templates.forEach((item) => {
      if (item.value)
        model[item.value] = unref(item.defaultQueryValue) !== undefined ? unref(item.defaultQueryValue) : ''
    })
    return model
  }

  /**
   * 根据templates 生产表单项组件
   * @param templates
   * @param model
   * @param shouldWarpEvenly
   */
  getFromItems(templates: Templates[] | any, model, shouldWarpEvenly, isHorizontal, _this) {
    return templates
      .filter(item => !item.filterUnShow)
      .map((item) => {
        const FormItemComp = _this._getFormComponent(item.type)
        if (item.fetchOptions)
          item.fetchOptions()

        return (
          unref(item.show) === false
            ? null
            : <ElFormItem
              label={item.label}
              key={item.value}
              style={_this.getFromStyle(item, shouldWarpEvenly, isHorizontal)}
              prop={item.value}
            >
              {
                item.render
                  ? <item.render model={model} value={item.value}/>
                  : <FormItemComp onChange={item.onChange} {...item} model={model}/>
              }
            </ElFormItem>
        )
      })
  }

  getFromStyle(item: Templates, shouldWarpEvenly, isHorizontal) {
    const inlineLength = item.rowLength || 2
    const style = {
      width: (isHorizontal ? `calc(100% / ${inlineLength} - 1rem)` : ''),
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
    if (!isHorizontal && rest)
      style.width = `calc(100% * ${inlineLength - 1} / ${inlineLength} - 1rem)`

    return style
  }

  _getFormComponent(type: FormItem) {
    const renderer = globalFormItems.get(type)
    if (renderer)
      return renderer
  }
}
