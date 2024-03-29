import { ElEmpty, ElTable, ElTableColumn } from 'element-plus'
import type { VNode } from 'vue'
import type { Feature, TableRenderProps, TableRenderer, TableTemplate, Templates } from '../../types'

export class ElementUITable implements TableRenderer {
  render({ templates, feature, selection, showSummary = false, summaryMethod = () => ({}) }: TableRenderProps) {
    const slots = {
      empty: () => (<ElEmpty/>),
    }

    const TableColumn = this.getColumns(templates, feature, selection)

    return (props) => {
      return (
        <ElTable
          v-slots={slots}
          showSummary={showSummary}
          summaryMethod={summaryMethod}
          data={props.data.value}
          v-loading={props.loading.value}
          onSelection-Change={props.onSelectionChange}
          border={props.border}
        >
          {
            TableColumn
          }
        </ElTable>
      )
    }
  }

  getColumns(templates: Templates[], feature: Feature | undefined, selection = false): VNode[] {
    let filedColumns = templates
      .filter(item => !(
        (item.visible && item.visible.table && typeof item.visible.table === 'boolean' && !item.visible.table && item.label)
        || (item.visible && typeof item.visible.table === 'function' && item.visible.table(item) && item.label)
      ))
      .filter(item => item.label)
      .map((item) => {
        const columnsSlots = {
          default: scope => this._getColumn(item, scope),
        }

        return (
          <ElTableColumn
            v-slots={columnsSlots}
            key={item.value}
            label={item.label}
            prop={item.value}
            width={item.width ? item.width : ''}
            sortable={item.sortable ? item.sortable : false}
            sortMethod={item.sortMethod ? item.sortMethod : () => ({})}
            showOverflowTooltip={item.showOverflowTooltip ? item.showOverflowTooltip : false}
            align="center"
          />
        )
      })

    if (this.shouldFeaturesRender(feature)) {
      const operatorItem = templates.find(t => t.value === 'fuzzy-table-operate') as TableTemplate
      filedColumns = [...filedColumns,
        <ElTableColumn
          v-slots={{
            default: scope => (this._getColumn(operatorItem, scope)),
          }}
          key="fuzzy-table-operate"
          label="操作"
          prop="操作"
          align="center"
          width={operatorItem?.width ?? ''}
        />]
    }

    if (selection) {
      filedColumns = [
        <ElTableColumn key={'0'} type="selection" width={55}/>,
        ...filedColumns,
      ]
    }

    return filedColumns
  }

  /**
   * 是否展示操作功能
   * @param feature
   */
  shouldFeaturesRender(feature: Feature | undefined): boolean {
    if (feature) {
      if (feature.update === false && feature.delete === false)
        return false
    }
    return true
  }

  /**
   * 获取表格列
   * @param item
   * @param scope
   */
  _getColumn(item: TableTemplate, scope: any) {
    // custom render
    if (item?.render)
      return (item.render({ ...scope, key: item.value, value: scope.row[item.value] }))

    return (scope.row[item?.value] || scope.row[item?.value] === 0 ? scope.row[item?.value] : '-')
  }
}
