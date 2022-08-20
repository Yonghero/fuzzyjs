import type {
  FuzzyNextHandlers,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestCallback,
  Templates,
} from '../../types'
import { getTemplatesWithFeature, mapTemplateDefaultValue, mapTemplatesRenderer, templateMiddleWare } from '../../utils'
import type { EventBus } from './createEventBus'

let _renderer: Renderer
let _eventBus: EventBus
let _requestCallback: RequestCallback
let _handlers: FuzzyNextHandlers

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

  if (modalRenderer?.UpdateComponent)
    UpdateComponent = modalRenderer.UpdateComponent
  else
    UpdateComponent = createComp('update', 'put', getTemplatesWithFeature(options.template, 'update'))

  if (modalRenderer?.CreateComponent)
    CreateComponent = modalRenderer.CreateComponent
  else
    CreateComponent = createComp('create', 'post', getTemplatesWithFeature(options.template, 'create'))

  return {
    UpdateComponent,
    CreateComponent,
  }
}

function createComp(type, requestMethod, templates: Templates[]) {
  const form = _renderer.form.create({
    templates: templateMiddleWare([mapTemplatesRenderer, mapTemplateDefaultValue])(templates, type),
    isHorizontal: true,
    labelPosition: 'right',
    shouldLabelWidthAuto: false,
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

          const { success } = await _requestCallback[requestMethod](model)
          await rest()

          if (success)
            return true
        }
      }

      async function processModel(model) {
        let _model = { ...model }
        if (type === 'create') {
          if (_handlers?.createConfirm)
            _model = await _handlers.createConfirm({ data: form.model, url: _requestCallback.urls.create })
        }
        if (type === 'update') {
          if (_handlers?.updateConfirm)
            _model = await _handlers.updateConfirm({ data: form.model, url: _requestCallback.urls.update })
        }
        return _model
      }

      return () => <form.render modelValue={props.row.data}/>
    },
  })
}
