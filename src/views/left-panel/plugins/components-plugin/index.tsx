import { Edit } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  key: 'componentsPlugin',
  label: '组件库',
  order: 1,
  icon: Edit,
  setup() {
    return <div>组件库</div>
  }
})
