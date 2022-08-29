import type { VNode } from 'vue'
import { computed, reactive } from 'vue'
import type { FormCompProps, FormItem, FormRenderProps, FormRenderer, Templates } from '../../types'

export class ArcoUIForm implements FormRenderer {
  create({ templates }: FormRenderProps) {
    const model = this.getModel(unref(templates))

    const FormItems = this.getFromItems(unref(templates), model)
    const formRef = ref()
    return {
      render: (
        <a-form model={model}
          layout={'inline'}
          ref={formRef}
          size={'medium'}>
          {
            FormItems
          }
        </a-form>
      ),
      model,
      formRef,
    }
  }

  getModel(templates: Templates[] | any) {
    const model = reactive({})
    templates.forEach((item) => {
      if (item.value)
        model[item.value] = item.defaultQueryValue ? item.defaultQueryValue : ''
    })
    return model
  }

  getFromItems(templates: Templates[] | any, model) {
    return templates.map((item) => {
      const FormItemComp = this._getFormComponent(item.type)
      return (
        <a-form-item
          key={item.value}
          field={item.label}
          label={item.label}>
          <FormItemComp {...item} model={model}/>
        </a-form-item>
      )
    })
  }

  _getFormComponent(type: FormItem) {
    const COMPS_MAP = {
      input: this.input,
      select: this.select,
    }
    return COMPS_MAP[type]
  }

  input(props: Partial<FormCompProps>) {
    const _props = computed(() => {
      const p = { ...props }
      delete p.value
      return p
    })
    return (
      <a-input
        v-model={props.model[props.value]}
        placeholder="请输入"
        {..._props.value}
      >
      </a-input>
    )
  }

  select(props: Partial<FormCompProps>, { emit }): VNode {
    return (
      <a-select
        onChange={v => emit('change', props.value, v)}
        v-model={props.model[props.value]}
      >
        {
          props.options
          && unref(props.options).map(item => (
            <a-option
              key={item.value}
              value={item.value}
            >{
                item.label
              }</a-option>
          ))
        }
      </a-select>
    )
  }
}
