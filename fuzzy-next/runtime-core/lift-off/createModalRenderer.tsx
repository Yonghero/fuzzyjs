import type {
  FuzzyNextHandlers,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestCallback,
  Templates,
} from '../../types'
import {
  mapTemplateDefaultValue,
  mapTemplateOfFeature,
  mapTemplatesRenderer,
  templateMiddleWare,
} from '../../utils'
import type { EventBus } from './createEventBus'

let _renderer: Renderer
let _eventBus: EventBus
let _requestCallback: RequestCallback
let _handlers: FuzzyNextHandlers
let _options: OptionsConfiguration

/**
 * 提供新增、编辑时的弹窗内容
 */
export function createModalRenderer(renderer: Renderer, options: OptionsConfiguration, modalRenderer: ModalRenderer, requestCallback: RequestCallback, eventBus: EventBus, handlers: FuzzyNextHandlers): ModalRenderer {
  let UpdateComponent
  let CreateComponent

  _eventBus = eventBus
  _renderer = renderer
  _requestCallback = requestCallback
  _handlers = handlers
  _options = options

  if (modalRenderer?.UpdateComponent)
    UpdateComponent = modalRenderer.UpdateComponent
  else
    UpdateComponent = createComp('update', 'put', mapTemplateOfFeature(options.template, 'update'))

  if (modalRenderer?.CreateComponent)
    CreateComponent = modalRenderer.CreateComponent
  else
    CreateComponent = createComp('create', 'post', mapTemplateOfFeature(options.template, 'create'))

  return {
    UpdateComponent,
    CreateComponent,
  }
}

function createComp(type, requestMethod, templates: Templates[]) {
  const form = _renderer.form.create({
    templates: templateMiddleWare([mapTemplatesRenderer, mapTemplateDefaultValue])(templates, type),
    isHorizontal: false,
    labelPosition: 'right',
    shouldWarpEvenly: true,
    shouldLabelWidthAuto: false,
    shouldRemoveModelUndefined: true,
    labelWidth: _options.labelWidth,
  })

  return defineComponent({
    props: {
      row: {
        type: Object,
        default: () => ({ data: {} }),
      },
    },
    setup(props) {
      _eventBus.subscribe(type, invoke)
      _eventBus.subscribe('cancel', rest)

      async function rest() {
        return form.formRef.value.resetFields()
      }

      async function invoke() {
        const valid = await form.formRef.value.validate()
        if (valid) {
          const model = await processModel(form.model)
          if (model === null) {
            return {
              flag: false,
              message: '',
            }
          }
          const { success, message } = await _requestCallback[requestMethod](model)

          if (success) {
            // 成功后重置表单内容
            await rest()
            if (_handlers.updated)
              _handlers.updated()
            return { flag: true, message }
          }
          else {
            return { flag: false, message }
          }
        }
      }

      async function processModel(model) {
        let _model = { ...model }
        if (type === 'create') {
          if (_handlers?.createConfirm) {
            // 事件阻断器
            const prevent = new Promise((resolve) => {
              const timer = setTimeout(() => resolve(false), 500)

              _handlers.createConfirm && _handlers.createConfirm({
                data: form.model,
                url: _requestCallback.urls.create,
                preventDefault: () => {
                  resolve(true)
                  clearTimeout(timer)
                },
              }).then(m => _model = m)

              // 默认500毫秒 不阻止
            })
            const isPrevent = await prevent
            if (isPrevent)
              return null
          }
        }
        if (type === 'update') {
          if (_handlers?.updateConfirm) {
            // 默认500毫秒 不阻止
            const prevent = new Promise((resolve) => {
              const timer = setTimeout(() => resolve(false), 500)

              _handlers.updateConfirm && _handlers.updateConfirm({
                data: form.model,
                url: _requestCallback.urls.update,
                preventDefault: () => {
                  resolve(true)
                  clearTimeout(timer)
                },
              })
            })

            const isPrevent = await prevent
            if (isPrevent)
              return null
          }
          if (props.row.id)
            _model.id = props.row.id
        }
        if (_model.data && _model.url)
          _model = _model.data

        return _model
      }

      return () => <form.render modelValue={props.row}/>
    },
  })
}
