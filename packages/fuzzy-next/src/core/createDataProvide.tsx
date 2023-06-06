import type { Ref, VNode } from 'vue'
import { computed, ref } from 'vue'
import { workInProgressFuzzy } from '../extend/expose'
import type { PagingProvider } from '../../../../types'

export interface ValueOfProvide {
  filterParams: Ref<Record<string, any>>
  tableData: Ref<any[]>
  currentPage: Ref<number>
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
  setCurrentPage: (page: number) => void
}

export interface DataProvider extends ValueOfProvide {
  dispatch: DispatchOfProvide
}

export interface DialogProps {
  visible: boolean
  render: VNode
  type: 'update' | 'create'
  title: string
}

/**
 * 提供框架的全局数据
 */
export function createDataProvide(paging: PagingProvider): DataProvider {
  const currentPage = ref(1)
  const filterParams = ref({ [paging.current]: 1, [paging.size]: paging.sizeNum || 10 })
  const tableData = ref([])
  const total = ref(0)

  const tableLoading = ref(true)

  const dialog = ref<DialogProps>({
    visible: false,
    type: 'update',
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
    setCurrentPage(page) {
      currentPage.value = page
    },
  }

  workInProgressFuzzy.dataProvider.value = computed(() => {
    return {
      filterParams: filterParams.value,
      tableData: tableData.value,
      total: total.value,
    }
  })

  return {
    dispatch,
    filterParams,
    tableData,
    total,
    currentPage,
    tableLoading,
    dialog,
    dialogVisible,
  }
}
