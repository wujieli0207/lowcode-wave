import { EditPen } from '@element-plus/icons-vue'
import { defineComponent, computed, ref, watchEffect } from 'vue'
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
    const { currentPage } = storeToRefs(jsonConfigStore)

    const editor = computed(() => {
      return JSON.stringify(currentPage.value.children, null, 2)
    })

    // const editor = ref('{}')

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

    // watchEffect(() => {
    //   editor.value = JSON.stringify(currentPage.value.children, null, 2)
    // })

    // // watch(
    // //   () => currentPage.value,
    // //   (newVal) => {
    // //     // console.log('code-plugin newVal: ', newVal)
    // //     editor.value = JSON.stringify(newVal.children, null, 2)
    // //     console.log('editor: ', editor.value)
    // //   }
    // // )

    return () => (
      <div class={styles['container']}>
        <JsonEditor value={editor.value} onChange={handleChange} />
      </div>
    )
  }
})
