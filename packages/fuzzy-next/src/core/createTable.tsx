import { unref } from 'vue'
import type {
  FuzzyNextHandlers,
  ModalRenderer,
  OptionsConfiguration, PagingProvider,
  Renderer,
  RequestCallback,
  TableTemplate,
  Templates,
} from '../../../../types'
import {
  FuzzyComponentSize,
  mapTemplateOfFeature,
  mapTemplateOfOrder,
  mapTemplatesRenderer,
  templateMiddleWare,
} from '../extend'
import type { DataProvider } from './createDataProvide'

export function createTable(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, _templates: Partial<Templates>[], dataProvider: DataProvider, requestCallback: RequestCallback, options: OptionsConfiguration, paging: PagingProvider, mock: any, fuzzyOptions): any {
  const templates = templateMiddleWare([mapTemplatesRenderer, mapTemplateOfOrder, mapTemplateOfFeature])(_templates, 'table')

  const updateLangText = fuzzyOptions?.lang.update || '编辑'
  const deleteLangText = fuzzyOptions?.lang.delete || '删除'

  async function onUpdate(scope) {
    let row = scope.row
    if (handlers.updateBeforePop) {
      row = await handlers.updateBeforePop({ data: scope.row, url: requestCallback.urls.update })
      if (row.data && row.url)
        row = row.data
    }

    dataProvider.dispatch.setDialog({
      visible: true,
      title: `${updateLangText}${unref(options.title)}`,
      type: 'update',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error ts
      render: (<modalRenderer.UpdateComponent row={row}/>),
    })
  }

  async function onDelete(scope) {
    if (handlers.deleteBefore)
      await handlers.deleteBefore({ data: scope, url: requestCallback.urls.delete })

    const { success, message } = await requestCallback.delete(scope)
    if (success) {
      renderer.message.success(fuzzyOptions?.message?.deleteSuccess || '删除成功')

      if (dataProvider.tableData.value.length === 1 && dataProvider.currentPage.value !== 1)
        await requestCallback.get({ [paging.current]: dataProvider.currentPage.value - 1 })
      else
        await requestCallback.get({})

      // 删除成功后 重新请求最新的数据
      return
    }
    renderer.message.error(message)
  }

  // 是否添加操作栏
  if (options?.table?.visibleOperator === undefined || (options.table && options.table.visibleOperator)) {
    // 是否添加操作
    templates.push({
      width: options?.table?.operateWidth ? `${options.table?.operateWidth}px` : '180px',
      value: 'fuzzy-table-operate',
      visible: {
        table: true,
      },
      render(scope) {
        const UpdateRender = (
          <renderer.button.render type={'update'}
            size={unref(FuzzyComponentSize)}
            onClick={() => onUpdate(scope)}
          >
            {updateLangText}
          </renderer.button.render>
        )

        // @ts-expect-error 123
        const DeleteRender = (<renderer.confirm.render type="warning"
          onOk={() => onDelete(scope)}
          size={unref(FuzzyComponentSize)}
          onCancel={() => {
          }}>
          <renderer.button.render type={'delete'}>{deleteLangText}</renderer.button.render>
        </renderer.confirm.render>)

        if (options?.table?.operators) {
          const operators = options?.table?.operators(scope, { UpdateRender, DeleteRender })
          return <div class="w-full h-full flex justify-center items-center" style="column-gap: 1rem">
            {
              operators.map((Operator, idx) => {
                return (<Operator key={idx} size={unref(FuzzyComponentSize)}/>)
              })
            }
          </div>
        }
        else {
          return (<div class="w-full h-full flex justify-center items-center" style="column-gap: 1rem">
            {
              options.feature && options.feature.update === false
                ? null
                : (<renderer.button.render type={'update'}
                  size={unref(FuzzyComponentSize)}
                  onClick={() => onUpdate(scope)}>
                  {updateLangText}
                </renderer.button.render>)
            }
            {
              options.feature && options.feature.delete === false
                ? null
              // @ts-expect-error 123
                : <renderer.confirm.render type="warning"
                  size={unref(FuzzyComponentSize)}
                  onOk={() => onDelete(scope)}
                  onCancel={() => {
                  }}
                >
                  <renderer.button.render type={'delete'}>{deleteLangText}</renderer.button.render>
                </renderer.confirm.render>
            }

          </div>)
        }
      },
    } as TableTemplate)
  }

  // 是否添加序号
  if (options?.table?.No === undefined || (options.table && options.table.No)) {
    templates.unshift({
      label: '序号',
      value: 'fuzzy-No',
      table: {
        width: 60,
      },
      render(scope) {
        return (
          <span>{scope.$index + 1 + (dataProvider.filterParams.value[paging.current] - 1) * dataProvider.filterParams.value[paging.size]}</span>
        )
      },
    })
  }

  const Table = renderer.table.render({
    templates,
    feature: options.feature,
    selection: options?.table?.selection,
    showSummary: options?.table?.showSummary,
    summaryMethod: options?.table?.summaryMethod,
  })

  function onSelectionChange(p) {
    if (handlers.selectionChange)
      handlers.selectionChange(p)
  }

  return (
    <Table
      data={mock.data.length ? mock.data : dataProvider.tableData}
      loading={dataProvider.tableLoading}
      onSelectionChange={onSelectionChange}
      border={options?.table?.border ?? true}
      size={unref(FuzzyComponentSize)}
      maxHeight={options?.table?.maxHeight ? unref(options?.table.maxHeight) : ''}
    />
  )
}
