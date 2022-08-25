import type { FuzzyNextHandlers, ModalRenderer, OptionsConfiguration, Renderer, RequestCallback } from '../../types'
import type { DataProvider } from './createDataProvide'
import type { EventBus } from './createEventBus'

export function createDialog(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration, eventBus: EventBus) {
  async function update() {
    // 确认更新操作 关闭弹窗
    dataProvide.dispatch.setDialog({ visible: false })
    // 重新获取最新数据
    await requestCallback.get({})
  }

  // 点击确定按钮触发
  async function onConfirm(scope) {
    if (dataProvide.dialog.value.title.includes('新增')) {
      if (handlers.createConfirm)
        await handlers.createConfirm({ data: scope, url: requestCallback.urls.update })

      // 触发内部的确定按钮hook
      const { flag, message } = await eventBus.publish('create')
      if (flag) {
        await update()
        renderer.message.success(`${dataProvide.dialog.value.title}成功`)
      }
      else {
        renderer.message.warning(message)
      }
      await update()
    }
    else {
      if (handlers.updateConfirm)
        await handlers.updateConfirm({ data: scope, url: requestCallback.urls.update })

      // 触发内部的确定按钮hook
      const { flag, message } = await eventBus.publish('update')
      if (flag) {
        await update()
        renderer.message.success(`${dataProvide.dialog.value.title}成功`)
      }
      else {
        renderer.message.warning(message)
      }
    }
  }

  async function onCancel() {
    await eventBus.publish('cancel')
  }

  const WrapDialog = defineComponent({
    setup() {
      return () => (
        <renderer.dialog.render
          v-model={dataProvide.dialog.value.visible}
          title={dataProvide.dialog.value.title}
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
