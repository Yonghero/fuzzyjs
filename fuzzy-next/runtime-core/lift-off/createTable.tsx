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
  async function onUpdate(scope) {
    let row = scope.row
    if (handlers.updateBeforePop)
      row = await handlers.updateBeforePop({ data: scope.row, url: requestCallback.urls.update })

    dataProvider.dispatch.setDialog({
      visible: true,
      title: `编辑${options.title}`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error ts
      render: <modalRenderer.UpdateComponent row={row}/>,
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

  // 是否添加操作
  templates.push({
    width: options.operateWidth ? `${options.operateWidth}px` : '180px',
    value: 'fuzzy-table-operate',
    render(scope) {
      const UpdateRender = <renderer.button.render type={'update'}
        onClick={() => onUpdate(scope)}>编辑</renderer.button.render>

      // @ts-expect-error 123
      const DeleteRender = (<renderer.confirm.render type="warning"
        onOk={() => onDelete(scope)}
        onCancel={() => {
        }}>
        <renderer.button.render type={'delete'}>删除</renderer.button.render>
      </renderer.confirm.render>)

      if (options.operators) {
        const operators = options.operators(scope, { UpdateRender, DeleteRender })
        return <div class="w-full h-full flex justify-center items-center" style="column-gap: 1rem">
          {
            operators.map((Operator, idx) => {
              return <Operator key={idx}/>
            })
          }
        </div>
      }
      else {
        return (<div class="w-full h-full flex justify-center items-center" style="column-gap: 1rem">
          {
            options.feature && options.feature.update === false
              ? null
              : <renderer.button.render type={'update'} onClick={() => onUpdate(scope)}>编辑</renderer.button.render>
          }
          {
            options.feature && options.feature.delete === false
              ? null
              // @ts-expect-error 123
              : <renderer.confirm.render type="warning"
                onOk={() => onDelete(scope)}
                onCancel={() => {
                }}
              >
                <renderer.button.render type={'delete'}>删除</renderer.button.render>
              </renderer.confirm.render>
          }

        </div>)
      }
    },
  } as TableTemplate)

  // 是否添加序号
  if (options.No === undefined || options.No) {
    templates.unshift({
      label: '序号',
      value: 'fuzzy-No',
      width: 70,
      render(scope) {
        return <span>{scope.$index + 1 + (dataProvider.filterParams.value.current - 1) * dataProvider.filterParams.value.size}</span>
      },
    })
  }

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
