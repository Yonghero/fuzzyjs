import { unref } from 'vue'
import type {
  FuzzyNextHandlers,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestCallback,
  Templates,
} from '../../../../types'
import { FuzzyComponentSize } from '../extend'
import type { DataProvider } from './createDataProvide'

export function createCreateButton(renderer: Renderer, modalRenderer: ModalRenderer, templates: Templates[], handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration, fuzzyOptions) {
  const text = fuzzyOptions?.lang?.create || '新增'
  async function onCreate() {
    if (handlers.createBeforePop)
      await handlers.createBeforePop({ data: templates, url: requestCallback.urls.create })

    dataProvide.dispatch.setDialog({
      visible: true,
      title: `${text}${unref(options.title)}`,
      type: 'create',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error ts
      render: <modalRenderer.CreateComponent size={unref(FuzzyComponentSize)}/>,
    })
  }

  return <>
    {
      ((options.feature && options.feature.create !== false) || options.feature?.create === undefined)
        ? <renderer.button.render
          type={'create'}
          onClick={onCreate}
          size={unref(FuzzyComponentSize)}
        >
          {text}
        </renderer.button.render>
        : <span></span>
    }

  </>
}
