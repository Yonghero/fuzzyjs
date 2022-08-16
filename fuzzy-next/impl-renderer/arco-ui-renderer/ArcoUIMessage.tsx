import { Message } from '@arco-design/web-vue'
import type { MessageRender } from '../../types'

export class ArcoUIMessage implements MessageRender {
  error = (message) => {
    return Message.error(message)
  }

  success = (message) => {
    return Message.success(message)
  }

  warning = (message) => {
    return Message.warning(message)
  }
}
