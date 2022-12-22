import type { VNode } from 'vue'
import type { CreateFuzzyOptions, PagingProvider, Renderer, RequestCallback, Templates } from '../../types'
import {
  mapTemplateDefaultValue,
  mapTemplateOfFeature,
  mapTemplateOfOrder,
  mapTemplatesOptions,
  mapTemplatesRenderer,
  templateMiddleWare,
} from '../../utils'
import type { DataProvider } from './createDataProvide'

export function createFilter(renderer: Renderer, templates: Templates[], feature: any, requestCallback: RequestCallback, dataProvide: DataProvider, fuzzyOptions: CreateFuzzyOptions, paging: PagingProvider): { Filter: any; FilterButton: VNode } {
  const FilterFrom = renderer.form.create({
    templates: templateMiddleWare([mapTemplateOfFeature, mapTemplatesRenderer, mapTemplateDefaultValue, mapTemplateOfOrder, mapTemplatesOptions])(templates, 'filter'),
    feature,
    isHorizontal: true,
    shouldWarpEvenly: false,
    shouldValidate: false,
  })

  // invoke requestCallback to get filter data
  async function dispatchFilter() {
    dataProvide.dispatch.setTableLoading(true)
    const {
      success,
      data,
      message,
      total,
    } = await requestCallback.get({ ...FilterFrom.model, [paging.current]: 1 })
    // success
    dataProvide.dispatch.setTableLoading(false)
    if (success) {
      dataProvide.dispatch.setTableData(data)
      dataProvide.dispatch.setTotal(total)
      return
    }
    dataProvide.dispatch.setTableData([])
    dataProvide.dispatch.setTotal(0)
    // failed
    renderer.message.warning(message)
  }

  function FilterButton() {
    return (
      <renderer.button.render
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
    Filter: <FilterFrom.render/>,
    FilterButton: <FilterButton/>,
  }
}
