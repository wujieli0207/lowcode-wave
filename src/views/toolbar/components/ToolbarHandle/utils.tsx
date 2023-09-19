import { IFieldConfig, IPageConfig } from '#/editor'
import { JsonEditor } from '@/components/Editor'
import { HANDLE_KV } from '@/constant/eventConstant'
import { useModal } from '@/hooks/useModal'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { useClipboard } from '@vueuse/core'
import { ElNotification, ElAlert } from 'element-plus'
import { Ref, ref } from 'vue'

const jsonConfigStore = useJsonConfigStore()
const { resetCurrentField, undo, redo, clearPageChildren, updatePageChildren } = jsonConfigStore

/**
 *
 * @description 撤销
 */
export function handleUndo(
  currentPage: Ref<IPageConfig>,
  currentField: Ref<Nullable<IFieldConfig>>
) {
  undo()
  resetCurrentField(currentPage, currentField)
}

/**
 *
 * @description 重做
 */
export function handleRedo(
  currentPage: Ref<IPageConfig>,
  currentField: Ref<Nullable<IFieldConfig>>
) {
  redo()
  resetCurrentField(currentPage, currentField)
}

/**
 *
 * @description 清空页面
 */
export function handleClearPage(
  currentPage: Ref<IPageConfig>,
  currentField: Ref<Nullable<IFieldConfig>>
) {
  clearPageChildren()
  resetCurrentField(currentPage, currentField)

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
export function handleImportJSON(
  currentPage: Ref<IPageConfig>,
  currentField: Ref<Nullable<IFieldConfig>>
) {
  const editorValue = ref(JSON.stringify(currentPage.value.children, null, 2))
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
        <JsonEditor moduleValue={editorValue.value} height="300px" onChange={hangelEditorChange} />
      </>
    ),
    onComfirm: () => {
      try {
        const json = JSON.parse(editorValue.value)
        updatePageChildren(json, HANDLE_KV.IMPORT_PAGE)
        resetCurrentField(currentPage, currentField)

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
