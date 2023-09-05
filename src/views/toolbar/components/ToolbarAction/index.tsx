import { defineComponent } from 'vue'
import { handlePreview, handleSave } from './utils'

export default defineComponent({
  name: 'ToolbarAction',
  setup() {
    const actionList = [
      {
        label: '预览',
        type: 'default',
        onClick: handlePreview
      },
      {
        label: '保存',
        type: 'primary',
        onClick: handleSave
      }
    ]

    return () => (
      <div>
        {actionList.map((item) => (
          <el-button type={item.type} onClick={item.onClick} key={item.label}>
            {item.label}
          </el-button>
        ))}
      </div>
    )
  }
})
