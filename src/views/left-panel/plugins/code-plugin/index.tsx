import { EditPen } from '@element-plus/icons-vue'
import { computed, defineComponent, ref } from 'vue'
import { JsonEditor } from '@/components/Editor'
import styles from './index.module.scss'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { watch } from 'vue'

export default defineComponent({
  key: 'codePlugin',
  label: '代码',
  order: 3,
  icon: EditPen,
  setup() {
    const jsonConfigStore = useJsonConfigStore()
    const { currentPage, currentField } = storeToRefs(jsonConfigStore)
    const { updatePageChildren, resetCurrentField } = jsonConfigStore

    const editor = ref(JSON.stringify(currentPage.value.children, null, 2))

    function handleChange(value: string) {
      try {
        if (JSON.parse(value)) {
          updatePageChildren(JSON.parse(value))
          resetCurrentField(currentPage, currentField)
        }
      } catch (error) {
        // 避免多余 json 格式化
        // eslint-disable-next-line no-empty
      }
    }

    watch(
      () => currentPage.value,
      (newVal) => {
        editor.value = JSON.stringify(newVal.children, null, 2)
      }
    )

    return () => (
      <div class={styles['container']}>
        <JsonEditor moduleValue={editor.value} onChange={handleChange} />
      </div>
    )
  }
})
