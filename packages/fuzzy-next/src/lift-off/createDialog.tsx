import type { FuzzyNextHandlers, ModalRenderer, OptionsConfiguration, Renderer, RequestCallback } from '../../../../types'
import type { DataProvider } from './createDataProvide'
import type { EventBus } from './createEventBus'

export function createDialog(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration, eventBus: EventBus) {
  // 对话框确定并成功后调用
  async function update() {
    // 确认更新操作 关闭弹窗
    dataProvide.dispatch.setDialog({ visible: false })
    // 重新获取最新数据
    await requestCallback.get({})
  }

  // 点击确定按钮触发
  async function onConfirm() {
    // 触发内部的确定按钮hook
    const { flag, message } = await eventBus.publish(dataProvide.dialog.value.type)
    if (flag) {
      // 成功后更新数据
      await update()
      renderer.message.success(`${unref(dataProvide.dialog.value.title)}成功`)
    }
    else {
      if (message)
        renderer.message.warning(message)
    }
  }

  // 点击取消
  async function onCancel() {
    await eventBus.publish('cancel')
  }

  // function Title() {
  //   return (
  //     <div>123</div>
  //   )
  // }

  const WrapDialog = defineComponent({
    setup() {
      return () => (
        <renderer.dialog.render
          v-model={dataProvide.dialog.value.visible}
          // title={Title}
          title={unref(dataProvide.dialog.value.title)}
          onUpdate={onConfirm}
          onCancel={onCancel}
          style={options?.modalStyle || {}}
        >
          {
            dataProvide.dialog.value.render
          }
        </renderer.dialog.render>
      )
    },
  })

  return <WrapDialog/>
}
