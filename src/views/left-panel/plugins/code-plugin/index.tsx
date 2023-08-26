import { EditPen } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  key: 'codePlugin',
  label: '代码',
  order: 3,
  icon: EditPen,
  setup() {
    return <div>代码</div>
  }
})
