import { Document } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  key: 'pageTreePlugin',
  label: '页面层级',
  order: 2,
  icon: Document,
  setup() {
    return <div>页面层级</div>
  }
})
