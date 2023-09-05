import {
  CopyDocument,
  Delete,
  Download,
  RefreshLeft,
  RefreshRight,
  Upload
} from '@element-plus/icons-vue'
import { defineComponent, toRefs } from 'vue'
import styles from './index.module.scss'
import { handleExportJSON } from './utils'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ToolbarHandle',
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentPage } = toRefs(jsonConfig.value)

    const handleList = [
      {
        groupName: '基础操作',
        list: [
          {
            label: '撤销',
            icon: RefreshLeft,
            click: () => {}
          },
          {
            label: '重做',
            icon: RefreshRight,
            click: () => {}
          }
        ]
      },
      {
        groupName: '扩展操作',
        list: [
          {
            label: '清空页面',
            icon: Delete,
            click: () => {}
          },
          {
            label: '复制页面',
            icon: CopyDocument,
            click: () => {}
          }
        ]
      },
      {
        groupName: '更多操作',
        list: [
          {
            label: '导入JSON',
            icon: Upload,
            click: () => {}
          },
          {
            label: '导出JSON',
            icon: Download,
            click: () => handleExportJSON(currentPage.value)
          }
        ]
      }
    ]
    return () => (
      <div class={styles['toolbar-handle']}>
        {handleList.map((group, index) => (
          <>
            {group.list.map((item) => {
              return (
                <div class={styles['toolbar-handle__item']} onClick={item.click}>
                  <el-icon>
                    <item.icon />
                  </el-icon>
                  <span>{item.label}</span>
                </div>
              )
            })}
            {index !== handleList.length - 1 && (
              <el-divider direction="vertical" class={styles['toolbar-handle__divider']} />
            )}
          </>
        ))}
      </div>
    )
  }
})
