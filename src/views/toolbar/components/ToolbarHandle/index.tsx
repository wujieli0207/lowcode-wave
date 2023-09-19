import { Delete, Download, RefreshLeft, RefreshRight, Upload } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'
import styles from './index.module.scss'
import {
  handleClearPage,
  handleExportJSON,
  handleImportJSON,
  handleRedo,
  handleUndo
} from './utils'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ToolbarHandle',
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { currentPage, currentField, undoCount, redoCount } = storeToRefs(jsonConfigStore)

    const handleList = [
      {
        groupName: '基础操作',
        list: [
          {
            label: '撤销',
            icon: RefreshLeft,
            click: () => handleUndo(currentPage, currentField)
          },
          {
            label: '重做',
            icon: RefreshRight,
            click: () => handleRedo(currentPage, currentField)
          }
        ]
      },
      {
        groupName: '更多操作',
        list: [
          {
            label: '清空页面',
            icon: Delete,
            click: () => handleClearPage(currentPage, currentField)
          },
          {
            label: '导入JSON',
            icon: Upload,
            click: () => handleImportJSON(currentPage, currentField)
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
                  <span>
                    {item.label}
                    {item.label === '撤销' ? `(${undoCount.value})` : ''}
                    {item.label === '重做' ? `(${redoCount.value})` : ''}
                  </span>
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
