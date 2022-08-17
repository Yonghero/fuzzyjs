import type {
  CreateFuzzyOptions,
  ExtraRenderer,
  FuzzyNextHandlers,
  LayoutProviderRenderer,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestProvider,
} from '../../types'
import { getTemplatesWithFeature } from '../../utils'
import { workInProgressFuzzy } from '../createFuzzy'
import { createEventBus } from './createEventBus'
import { createDataProvide } from './createDataProvide'
import { createDialog } from './createDialog'
import { createFilter } from './createFilter'
import { createPage } from './createPage'
import { createRequest } from './createRequest'
import { createTable } from './createTable'
import { createCreateButton } from './createCreateButton'
import { createModalRenderer } from './createModalRenderer'

export function LiftOff(renderer: Renderer, _modalRenderer: ModalRenderer, extraRenderer: ExtraRenderer, handlers: FuzzyNextHandlers, options: OptionsConfiguration, mock: any[], request: RequestProvider, fuzzyOptions: CreateFuzzyOptions): Omit<LayoutProviderRenderer, 'Tab'> {
  console.log('----LiftOff----')

  // global data provide
  // dispatch data
  const dataProvide = createDataProvide()

  // provide request's methods
  const requestCallback = createRequest(options, request, handlers, dataProvide)

  // 提供给用户的浅更新
  workInProgressFuzzy.shallowUpdate = requestCallback.get

  const eventBus = createEventBus()
  // warp handlers inject self hooks

  // update & create dialog's content
  const modalRenderer = createModalRenderer(renderer, options, _modalRenderer, requestCallback, eventBus)

  const Dialog = createDialog(renderer, modalRenderer, handlers, requestCallback, dataProvide, options, eventBus)

  // Table Component
  const Table = createTable(
    renderer,
    modalRenderer,
    handlers,
    getTemplatesWithFeature(options.template, 'table'),
    dataProvide,
    requestCallback,
    options,
  )

  // Page Component
  const Page = createPage(renderer, handlers, requestCallback, dataProvide)

  // Filter Component
  const {
    Filter,
    FilterButton,
  } = createFilter(
    renderer,
    getTemplatesWithFeature(options.template, 'filter'),
    options?.feature,
    requestCallback,
    dataProvide,
    fuzzyOptions,
  )

  const CreateButton = createCreateButton(renderer, modalRenderer, getTemplatesWithFeature(options.template, 'create'), handlers, requestCallback, dataProvide, options)

  return {
    Filter,
    FilterButton,
    Table,
    Page,
    Dialog,
    CreateButton,
    ExtraRenderer: extraRenderer,
  }
}
