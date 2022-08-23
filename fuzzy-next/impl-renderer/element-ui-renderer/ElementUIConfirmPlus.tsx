import { Teleport } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import type { ConfirmRender } from '../../types'

export class ElementUIConfirmPlus implements ConfirmRender {
  render = defineComponent({
    props: {
      content: {
        type: String,
        default: '此操作将永久删除该数据, 是否继续?',
      },
    },
    emits: ['cancel', 'ok'],
    setup(props, { emit, slots }) {
      const visible = ref(false)

      const onClick = () => {
        visible.value = true
      }

      const _slots = {
        footer: () => (
          <span class="dialog-footer">
            <el-button type="primary" onClick={() => {
              emit('cancel')
              visible.value = false
            }}>取消</el-button>
            <el-button onClick={() => {
              emit('ok')
              visible.value = false
            }}>确定</el-button>
          </span>
        ),
      }
      return () => (
        <>
          <Teleport to="body">
            <el-dialog
              v-slots={_slots}
              v-model={visible.value}
              title="提示"
              width="30%">
              <span class="flex items-center gap-x-2">
                <el-icon size="30" color="#dda450"><InfoFilled/></el-icon>
                {props.content}
              </span>
            </el-dialog>
          </Teleport>

          <div onClick={onClick}>
            {
              slots.default && slots.default()
            }
          </div>
        </>
      )
    },
  })
}
