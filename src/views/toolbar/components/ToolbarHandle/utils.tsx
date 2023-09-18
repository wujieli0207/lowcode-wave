import { IFieldConfig, IPageConfig } from '#/editor'
import { JsonEditor } from '@/components/Editor'
import { useModal } from '@/hooks/useModal'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { useClipboard } from '@vueuse/core'
import { ElNotification, ElAlert } from 'element-plus'
import { find } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'

const jsonConfigStore = useJsonConfigStore()
const { currentField } = storeToRefs(jsonConfigStore)
const { setCurrentFiled, undo, redo, clearPageChildren, importPageChildren } = jsonConfigStore

/**
 * @description 撤销和重做之后，重置当前选中组件
 */
function _resetCurrentField(currentPage: Ref<IPageConfig>) {
  if (currentField.value) {
    const fieldItem = find(
      currentPage.value.children,
      (item) => (item as unknown as IFieldConfig)._id === currentField.value?._id
    ) as unknown as IFieldConfig

    setCurrentFiled(fieldItem, false)
  }
}

/**
 *
 * @description 撤销
 */
export function handleUndo(currentPage: Ref<IPageConfig>) {
  undo()
  _resetCurrentField(currentPage)
}

/**
 *
 * @description 重做
 */
export function handleRedo(currentPage: Ref<IPageConfig>) {
  redo()
  _resetCurrentField(currentPage)
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
