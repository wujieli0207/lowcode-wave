import { defineComponent } from 'vue'
import { TakeawayBox } from '@element-plus/icons-vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import { find } from 'tree-lodash'
import { IFieldConfig } from '#/editor'
import { HANDLE_VL } from '@/constant/eventConstant'

export default defineComponent({
  key: 'historyPlugin',
  label: '操作历史',
  order: 4,
  icon: TakeawayBox,
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { undoStack, currentField, currentPage } = storeToRefs(jsonConfigStore)
    const { jumpTo, setCurrentFiled } = jsonConfigStore

    function handleResetCurrentField() {
      const field = find(currentPage.value.children, (item) => {
        return (item as unknown as IFieldConfig)._id === currentField.value!._id
      }) as unknown as IFieldConfig
      setCurrentFiled(field)
    }

    function handleClick(index: number) {
      jumpTo(index)
      handleResetCurrentField()
    }

    return () => (
      <div class={styles['history']}>
        {undoStack.value
          // 先过滤掉选中组件操作，跳跃点击历史记录可能存在问题
          .filter((item) => item.action !== HANDLE_VL.setFocus)
          .map((item, index) => (
            <el-card
              shadow="hover"
              body-style={{ padding: '8px' }}
              class={styles['history__card']}
              onClick={() => handleClick(index)}
            >
              <div class={styles['history__card__item']}>
                <span>{`${index + 1}. ${item.action}`}</span>
                <span>{dayjs(item.actionTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
            </el-card>
          ))}
      </div>
    )
  }
})
