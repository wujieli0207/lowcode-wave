// import { useModal } from '@/hooks/useModal;
import uiComponents from '@/components/UIComponents'
import { IFieldConfig, IPageConfig } from '#/editor'
import { cloneDeep } from 'lodash-es'
import { cloneFieldInstance } from '@/views/left-panel/plugins/components-plugin/utils'
import { useModal } from '@/hooks/useModal'
import { JsonEditor } from '@/components/Editor'

/**
 * @description 通过 Modal 查看节点 json
 */
export function handleViewJson(element: IFieldConfig) {
  useModal({
    title: '节点信息',
    content: () => (
      <>
        <JsonEditor value={JSON.stringify(element, null, 2)} height="300px" />
      </>
    )
  })
}

/**
 * @description 向前插入节点
 */
export function handleInsertBefore(element: IFieldConfig, pageChildren: IPageConfig['children']) {
  const fieldElement = uiComponents[element.type]
  const fieldInstance = cloneFieldInstance(cloneDeep(fieldElement))
  const currentIndx = pageChildren.findIndex((item) => item._id === element._id)

  if (currentIndx === 0) {
    pageChildren.unshift(fieldInstance)
  } else {
    pageChildren.splice(currentIndx - 1, 0, fieldInstance)
  }
}

/**
 * @description 向前插入节点
 */
export function handleInsertAfter(element: IFieldConfig, pageChildren: IPageConfig['children']) {
  const fieldElement = uiComponents[element.type]
  const fieldInstance = cloneFieldInstance(cloneDeep(fieldElement))
  const currentIndx = pageChildren.findIndex((item) => item._id === element._id)

  if (currentIndx === pageChildren.length - 1) {
    pageChildren.push(fieldInstance)
  } else {
    pageChildren.splice(currentIndx + 1, 0, fieldInstance)
  }
}

/**
 * @description 删除节点
 */
export function handleDelete(element: IFieldConfig, pageChildren: IPageConfig['children']) {
  pageChildren.splice(
    pageChildren.findIndex((item) => item._id === element._id),
    1
  )
}
