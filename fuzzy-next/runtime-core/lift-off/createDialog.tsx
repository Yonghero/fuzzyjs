import type { ModalRenderer, OptionsConfiguration, Renderer } from '../../types'
import type { FuzzyNextHandlers } from '../../types/handler'
import type { RequestCallback } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'
import type { EventBus } from './createEventBus'

export function createDialog(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration<any>, eventBus: EventBus) {
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
      const isOk = await eventBus.publish('create')
      if (isOk) {
        renderer.message.success(`${dataProvide.dialog.value.title}成功`)
        await update()
      }
    }
    else {
      if (handlers.updateConfirm) {
        // invoke update confirm hook
        if (handlers.updateConfirm)
          await handlers.updateConfirm({ data: scope, url: requestCallback.urls.update })

        // 触发内部的确定按钮hook
        const isOk = await eventBus.publish('update')
        if (isOk) {
          renderer.message.success(`${dataProvide.dialog.value.title}成功`)
          await update()
        }
      }
    }
  }

  function onCancel(scope) {
    console.log('cancel', scope)
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
