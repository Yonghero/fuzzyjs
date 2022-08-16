import type { ModalRenderer, OptionsConfiguration, Renderer, Templates } from '../../types'
import type { RequestCallback } from '../../types/requestProvider'
import { getTemplatesWithFeature, mapTemplatesRenderer } from '../../utils'
import type { EventBus } from './createEventBus'
let _renderer: Renderer
let _eventBus: EventBus
let _requestCallback: RequestCallback

/**
 * 提供新增、编辑时的弹窗内容
 */
export function createModalRenderer(renderer: Renderer, options: OptionsConfiguration<any>, modalRenderer: ModalRenderer, requestCallback: RequestCallback, eventBus: EventBus): ModalRenderer {
  let UpdateComponent
  let CreateComponent

  _eventBus = eventBus
  _renderer = renderer
  _requestCallback = requestCallback

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
    templates: mapTemplatesRenderer(templates, type),
    isHorizontal: true,
    labelPosition: 'top',
  })

  return defineComponent({
    setup() {
      _eventBus.subscribe(type, invoke)

      async function invoke() {
        const valid = await form.formRef.value.validate()
        if (valid) {
          const { success } = await _requestCallback[requestMethod](form.model)
          if (success)
            return true
        }
      }
      return () => <form.render/>
    },
  })
}
