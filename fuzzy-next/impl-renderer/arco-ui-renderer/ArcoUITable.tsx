import { Empty, Table } from '@arco-design/web-vue'
import type { Feature, TableRenderProps, TableRenderer, TableTemplate, Templates } from '../../types'

export class ArcoUITable implements TableRenderer {
  render({ templates, feature }: TableRenderProps) {
    const slots = {
      empty: () => (<Empty/>),
    }
    const TableColumn = this.getColumns(templates, feature)

    return (props) => {
      return (
        <Table
          v-slots={slots}
          data={props.data.value}
          columns={TableColumn}></Table>
      )
    }
  }

  /**
     * 是否展示操作功能
     * @param feature
     */
  shouldFeaturesRender(feature: Feature | undefined): boolean {
    return !(feature?.update === false || feature?.delete === false)
  }

  getColumns(templates: Templates[], feature: Feature | undefined): any[] {
    const filedColumns = templates
      .filter(item => !(
        (item.visible && item.visible.table && typeof item.visible.table === 'boolean' && !item.visible.table && item.label)
                || (item.visible && typeof item.visible.table === 'function' && item.visible.table(item) && item.label)
      ))
      .filter(item => item.label)
      .map((item) => {
        return {
          dataIndex: item.value,
          title: item.label,
          tooltip: item.showOverflowTooltip,
          render: scope => this._getColumn(item, scope),
        }
      })

    if (this.shouldFeaturesRender(feature)) {
      const operatorItem = templates.find(t => t.value === 'fuzzy-table-operate') as TableTemplate
      return [...filedColumns,
        {
          dataIndex: 'fuzzy-table-operate',
          title: '操作',
          render: scope => this._getColumn(operatorItem, scope),
        },
      ]
    }

    return filedColumns
  }

  /**
     * 获取表格列
     * @param item
     * @param scope
     */
  _getColumn(item: TableTemplate, scope: any) {
    // custom render
    if (item.render)
      return (item.render({ row: scope.record }))

    return (scope.record[scope.column.dataIndex] || scope.record[scope.column.dataIndex] === 0 ? scope.record[scope.column.dataIndex] : '-')
  }
}
