// import { useModal } from '@/hooks/useModal;
import uiComponents from '@/components/UIComponents'
import { IFieldConfig, IPageConfig } from '#/editor'
import { cloneDeep } from 'lodash-es'
import { cloneFieldInstance } from '@/views/left-panel/plugins/components-plugin/utils'
import { useModal } from '@/hooks/useModal'
import { JsonEditor } from '@/components/Editor'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { HANDLE_KV } from '@/constant/eventConstant'

const jsonConfigStore = useJsonConfigStore()

const { addPageChildren, deletePageChildren, movePageChildren } = jsonConfigStore

/**
 * @description 通过 Modal 查看节点 json
 */
export function handleViewJson(element: IFieldConfig) {
  useModal({
    title: '节点信息',
    content: () => (
      <>
        <JsonEditor moduleValue={JSON.stringify(element, null, 2)} height="300px" />
      </>
    )
  })
}

/**
 * @description 向前插入节点
 */
export function handleInsertBefore(element: IFieldConfig) {
  const fieldElement = uiComponents[element.type]
  const fieldInstance = cloneFieldInstance(cloneDeep(fieldElement))

  addPageChildren(fieldInstance, HANDLE_KV.ADD_FIELD_BEFORE)
}

/**
 * @description 向前插入节点
 */
export function handleInsertAfter(element: IFieldConfig) {
  const fieldElement = uiComponents[element.type]
  const fieldInstance = cloneFieldInstance(cloneDeep(fieldElement))

  addPageChildren(fieldInstance, HANDLE_KV.ADD_FIELD_AFTER)
}

/**
 * @description 删除节点
 */
export function handleDelete(element: IFieldConfig) {
  deletePageChildren(element)
}

/**
 * @description 向前移动节点
 */
export function handleMoveUp(element: IFieldConfig) {
  movePageChildren(element, HANDLE_KV.MOVE_FIELD_UP)
}

/**
 * @description 向后移动节点
 */
export function handleMoveDown(element: IFieldConfig) {
  movePageChildren(element, HANDLE_KV.MOVE_FIELD_DOWN)
}
