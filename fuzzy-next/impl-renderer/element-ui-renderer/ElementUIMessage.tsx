import { ElMessage } from 'element-plus'
import type { MessageRender } from '../../types'

export class ElementUIMessage implements MessageRender {
  error = (message) => {
    return ElMessage.error(message)
  }

  success = (message) => {
    return ElMessage.success(message)
  }

  warning = (message) => {
    return ElMessage.warning(message)
  }
}
