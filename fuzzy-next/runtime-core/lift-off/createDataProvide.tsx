import type { Ref, VNode } from 'vue'
import { ref } from 'vue'

export interface ValueOfProvide {
  filterParams: Ref<Record<string, any>>
  tableData: Ref<any[]>
  total: Ref<number>
  tableLoading: Ref<boolean>
  dialog: Ref<DialogProps>
  dialogVisible: Ref<boolean>
}

export interface DispatchOfProvide {
  setFilterParams: (params: any) => void
  setTableData: (data: any) => void
  setTotal: (num) => void
  setTableLoading: (loading: boolean) => void
  setDialog: (dialog: Partial<DialogProps>) => void
}

export interface DataProvider extends ValueOfProvide{
  dispatch: DispatchOfProvide
}

export interface DialogProps {
  visible: boolean
  render: VNode
  title: string
}

/**
 * 提供框架的全局数据
 */
export function createDataProvide(): DataProvider {
  const filterParams = ref({})
  const tableData = ref([])
  const total = ref(0)

  const tableLoading = ref(true)

  const dialog = ref<DialogProps>({
    visible: false,
    title: '编辑',
    render: <>hhh</>,
  })

  const dialogVisible = ref(false)

  const dispatch = {
    setFilterParams(params) {
      filterParams.value = { ...filterParams.value, ...params }
    },
    setTableData(data) {
      tableData.value = data
    },
    setTotal(num) {
      total.value = num
    },
    setTableLoading(loading) {
      tableLoading.value = loading
    },
    setDialog(props: Partial<DialogProps>) {
      dialog.value = { ...dialog.value, ...props }
    },
  }

  return {
    dispatch,
    filterParams,
    tableData,
    total,
    tableLoading,
    dialog,
    dialogVisible,
  }
}
