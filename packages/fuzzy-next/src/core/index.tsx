import type {
  CreateFuzzyOptions,
  ExtraRenderer,
  FuzzyNextHandlers,
  LayoutProviderRenderer,
  Mock,
  ModalRenderer,
  OptionsConfiguration, PagingProvider,
  Renderer,
  RequestProvider,
} from '../../../../types'
import { mapTemplateOfFeature, workInProgressFuzzy } from '../extend'
import { createEventBus } from './createEventBus'
import { createDataProvide } from './createDataProvide'
import { createDialog } from './createDialog'
import { createFilter } from './createFilter'
import { createPage } from './createPage'
import { createRequest } from './createRequest'
import { createTable } from './createTable'
import { createCreateButton } from './createCreateButton'
import { createModalRenderer } from './createModalRenderer'

export function LiftOff(renderer: Renderer, _modalRenderer: ModalRenderer, extraRenderer: ExtraRenderer, handlers: FuzzyNextHandlers, options: OptionsConfiguration, mock: Mock, request: RequestProvider, fuzzyOptions: CreateFuzzyOptions, paging: PagingProvider): Omit<LayoutProviderRenderer, 'Tab'> {
  // global data provide
  // dispatch data
  const dataProvide = createDataProvide(paging)

  // provide request's methods
  const requestCallback = createRequest(options, request, handlers, dataProvide, paging, mock)

  // 提供给用户的浅更新
  workInProgressFuzzy.shallowUpdate = requestCallback.get

  const eventBus = createEventBus()
  // warp handlers inject self hooks

  // update & create dialog's content
  const modalRenderer = createModalRenderer(renderer, options, _modalRenderer, requestCallback, eventBus, handlers)

  const Dialog = createDialog(renderer, modalRenderer, handlers, requestCallback, dataProvide, options, eventBus, fuzzyOptions)

  // Table Component
  const Table = createTable(renderer, modalRenderer, handlers, options.template, dataProvide, requestCallback, options, paging, mock, fuzzyOptions)

  // Page Component
  const Page = createPage(renderer, handlers, requestCallback, dataProvide, paging)

  // Filter Component
  const {
    Filter,
    FilterButton,
  } = createFilter(renderer, options.template, options?.feature, requestCallback, dataProvide, fuzzyOptions, paging)

  const CreateButton = createCreateButton(renderer, modalRenderer, mapTemplateOfFeature(options.template, 'create'), handlers, requestCallback, dataProvide, options, fuzzyOptions)

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
