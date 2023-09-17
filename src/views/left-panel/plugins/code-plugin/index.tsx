import { EditPen } from '@element-plus/icons-vue'
import { defineComponent, computed } from 'vue'
import { JsonEditor } from '@/components/Editor'
import styles from './index.module.scss'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'

export default defineComponent({
  key: 'codePlugin',
  label: '代码',
  order: 3,
  icon: EditPen,
  setup() {
    const jsonConfigStore = useJsonConfigStore()
    const { currentPage } = storeToRefs(jsonConfigStore)

    const editor = computed(() => {
      return JSON.stringify(currentPage.value.children, null, 2)
    })

    function handleChange(value: string) {
      try {
        if (JSON.parse(value)) {
          currentPage.value.children = JSON.parse(value)
        }
      } catch (error) {
        // 避免多余 json 格式化
        // eslint-disable-next-line no-empty
      }
    }

    return () => (
      <div class={styles['container']}>
        <JsonEditor value={editor.value} onChange={handleChange} />
      </div>
    )
  }
})
