import { defineComponent } from 'vue'
import { handleGoBackEdit, handlePreview, handleSave } from './utils'
import { useGlobalConfigStore } from '@/stores/modules/globalConfig'

export default defineComponent({
  name: 'ToolbarAction',
  setup() {
    const { globalConfig } = useGlobalConfigStore()

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

    const previewList = [
      {
        label: '返回',
        type: 'default',
        onClick: handleGoBackEdit
      }
    ]

    return () => (
      <div>
        {(globalConfig.isPreview ? previewList : actionList).map((item) => (
          <el-button type={item.type} onClick={item.onClick} key={item.label}>
            {item.label}
          </el-button>
        ))}
      </div>
    )
  }
})
