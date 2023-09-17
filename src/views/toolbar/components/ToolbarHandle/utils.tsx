import { IPageConfig } from '#/editor'
import { JsonEditor } from '@/components/Editor'
import { useModal } from '@/hooks/useModal'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { useClipboard } from '@vueuse/core'
import { ElNotification, ElAlert } from 'element-plus'
import { ref } from 'vue'

const jsonConfigStore = useJsonConfigStore()
const { undo, redo, clearPageChildren, importPageChildren } = jsonConfigStore

/**
 *
 * @description 撤销
 */
export function handleUndo() {
  undo()
}

/**
 *
 * @description 重做
 */
export function handleRedo() {
  redo()
}

/**
 *
 * @description 清空页面
 */
export function handleClearPage() {
  clearPageChildren()

  ElNotification({
    message: '清空页面成功',
    type: 'success',
    duration: 2000
  })
}

/**
 *
 * @description 导入 JSON
 *
 */
export function handleImportJSON(currentPage: IPageConfig) {
  const editorValue = ref(JSON.stringify(currentPage.children, null, 2))
  const hangelEditorChange = (value) => {
    editorValue.value = value
  }
  useModal({
    title: '导入 JSON',
    content: () => (
      <>
        <ElAlert
          title="展示的是当前页面的JSON，将需要导入的JSON覆盖并保存"
          type="warning"
          show-icon={true}
          closable={false}
        />
        <JsonEditor value={editorValue.value} height="300px" onChange={hangelEditorChange} />
      </>
    ),
    onComfirm: () => {
      try {
        const json = JSON.parse(editorValue.value)
        importPageChildren(json)
        ElNotification({
          message: '导入成功',
          type: 'success',
          duration: 2000
        })

        return true
      } catch (error) {
        ElNotification({
          message: `导入失败:${error}`,
          type: 'error',
          duration: 4000
        })

        return false
      }
    }
  })
}

/**
 *
 * @description 导出 JSON
 */
export function handleExportJSON(currentPage: IPageConfig) {
  const { copy } = useClipboard({ source: JSON.stringify(currentPage) })

  copy()
    .then(() => {
      ElNotification({
        message: '复制成功',
        type: 'success',
        duration: 2000
      })
    })
    .catch((error) => {
      ElNotification({
        message: `复制失败:${error}`,
        type: 'error',
        duration: 4000
      })
    })
}
