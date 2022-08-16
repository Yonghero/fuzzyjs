import { Button } from '@arco-design/web-vue'
import type { ButtonRenderer } from '../../types'
export class ArcoUIButton implements ButtonRenderer {
  render(props, { slots }) {
    return (
      <Button {...props}>
        {
          slots.default && slots.default()
        }
      </Button>
    )
  }
}
