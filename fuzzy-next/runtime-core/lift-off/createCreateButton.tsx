import type { ModalRenderer, OptionsConfiguration, Renderer, Templates } from '../../types'
import type { FuzzyNextHandlers } from '../../types/handler'
import type { RequestCallback } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'

export function createCreateButton(renderer: Renderer, modalRenderer: ModalRenderer, templates: Templates[], handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration<any>) {
  async function onCreate() {
    if (handlers.createBeforePop)
      await handlers.createBeforePop({ data: templates, url: requestCallback.urls.create })

    dataProvide.dispatch.setDialog({
      visible: true,
      title: `新增${options.title}`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error ts
      render: <modalRenderer.CreateComponent />,
    })
  }

  return <renderer.button.render
    type={'create'}
    onClick={onCreate}
  >新增
  </renderer.button.render>
}
