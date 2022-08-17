import type {
  FuzzyNextHandlers,
  ModalRenderer,
  OptionsConfiguration,
  Renderer,
  RequestCallback,
  TableTemplate,
  Templates,
} from '../../types'
import { mapTemplatesRenderer } from '../../utils'
import type { DataProvider } from './createDataProvide'

export function createTable(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, templates: Partial<Templates>[], dataProvider: DataProvider, requestCallback: RequestCallback, options: OptionsConfiguration): any {
  function onUpdate(scope) {
    console.log(scope)

    if (handlers.updateBeforePop)
      handlers.updateBeforePop({ data: scope, url: requestCallback.urls.update })

    dataProvider.dispatch.setDialog({
      visible: true,
      title: `编辑${options.title}`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error ts
      render: <modalRenderer.UpdateComponent row={scope.row}/>,
    })
  }

  async function onDelete(scope) {
    if (handlers.deleteBefore)
      await handlers.deleteBefore({ data: scope, url: requestCallback.urls.delete })

    const { success, message } = await requestCallback.delete(scope)
    if (success) {
      renderer.message.success('删除成功')

      // 删除成功后 重新请求最新的数据
      await requestCallback.get({})
      return
    }
    renderer.message.error(message)
  }

  templates.push({
    width: options.operateWidth ? `${options.operateWidth}px` : '180px',
    value: 'fuzzy-table-operate',
    render(scope) {
      return (<div class="w-full h-full flex justify-center items-center gap-x-4">
        {
          options.feature && options.feature.update === false
            ? null
            : <renderer.button.render type={'update'} onClick={() => onUpdate(scope)}>编辑</renderer.button.render>
        }
        {
          options.feature && options.feature.delete === false
            ? null
            : <renderer.confirm.render type="warning"
              onOk={() => onDelete(scope)}
              onCancel={() => {
              }}
              content={'是否确认删除'}>
              <renderer.button.render type={'delete'}>编辑</renderer.button.render>
            </renderer.confirm.render>
        }

      </div>)
    },
  } as TableTemplate)

  const Table = renderer.table.render({
    templates: mapTemplatesRenderer(templates as any, 'table'),
    feature: options.feature,
    selection: options.selection,
  })

  function onSelectionChange(p) {
    if (handlers.selectionChange)
      handlers.selectionChange(p)
  }

  return <Table
    data={dataProvider.tableData}
    loading={dataProvider.tableLoading}
    onSelectionChange={onSelectionChange}
    border={options.border ?? true}
  />
}
