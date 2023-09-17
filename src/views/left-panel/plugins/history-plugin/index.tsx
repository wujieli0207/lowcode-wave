import { defineComponent } from 'vue'
import { TakeawayBox } from '@element-plus/icons-vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import { find } from 'tree-lodash'
import { IFieldConfig } from '#/editor'

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
      const field = find(
        currentPage.value.children,
        (item) => (item as unknown as IFieldConfig)._id === currentField.value!._id
      ) as unknown as IFieldConfig
      setCurrentFiled(field)
    }

    function handleClick(index: number) {
      jumpTo(index)
      handleResetCurrentField()
    }

    return () => (
      <div class={styles['history']}>
        {undoStack.value.map((item, index) => (
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
