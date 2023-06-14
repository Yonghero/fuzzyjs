import type { VNode } from 'vue'
import { unref } from 'vue'
import type { CreateFuzzyOptions, PagingProvider, Renderer, RequestCallback, Templates } from '../../../../types'
import {
  FuzzyComponentSize,
  mapTemplateDefaultValue,
  mapTemplateOfFeature,
  mapTemplateOfOrder,
  mapTemplatesRenderer,
  templateMiddleWare,
} from '../extend'
import type { DataProvider } from './createDataProvide'

export function createFilter(renderer: Renderer, templates: Templates[], feature: any, requestCallback: RequestCallback, dataProvide: DataProvider, fuzzyOptions: CreateFuzzyOptions, paging: PagingProvider): { Filter: any; FilterButton: VNode } {
  const FilterFrom = renderer.form.create()

  // invoke requestCallback to get filter data
  async function dispatchFilter() {
    dataProvide.dispatch.setTableLoading(true)
    const {
      success,
      data,
      message,
      total,
    } = await requestCallback.get({ ...FilterFrom.formModel.value, [paging.current]: 1 })
    // success
    dataProvide.dispatch.setTableLoading(false)
    if (success) {
      dataProvide.dispatch.setTableData(data)
      dataProvide.dispatch.setTotal(total)
      return
    }
    // failed
    renderer.message.warning(message)
  }

  function FilterButton() {
    return (
      <renderer.button.render
        size={unref(FuzzyComponentSize)}
        type="filter"
        class="fuzzy-filter-button"
        onClick={dispatchFilter}>{
          fuzzyOptions.lang?.filter || '查询'
        }</renderer.button.render>
    )
  }

  // 首次加载
  Promise.resolve().then(dispatchFilter)

  return {
    Filter: (
      <FilterFrom.render
        templates={templateMiddleWare([mapTemplateOfFeature, mapTemplatesRenderer, mapTemplateDefaultValue, mapTemplateOfOrder])(templates, 'filter')}
        isHorizontal={false}
        shouldWarpEvenly={false}
        shouldValidate={false}
        size={unref(FuzzyComponentSize)}/>
    ),
    FilterButton: (<FilterButton/>),
  }
}
