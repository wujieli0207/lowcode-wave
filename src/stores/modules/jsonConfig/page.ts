import { HandleKey, IFieldConfig, IPageConfig } from '#/editor'
import { VueDraggableChangeEvent } from '#/plugin'
import { HANDLE_KV, HANDLE_VL } from '@/constant/eventConstant'
import { IUpdateOptions } from '@/hooks/useHistory'
import { find } from 'tree-lodash'
import { Ref } from 'vue'

export type updateHistoryFn = (
  updater: (draft: IPageConfig) => any,
  action: string,
  options?: IUpdateOptions
) => void

/**
 * @description 通过拖动添加组件
 */
export function addPageChildrenByDrag(
  updateHistory: updateHistoryFn,
  currentPage: Ref<IPageConfig>
) {
  return function (field: VueDraggableChangeEvent<IFieldConfig>) {
    const newIndex = field.added.newIndex

    if (newIndex === currentPage.value.children.length) {
      updateHistory((page: IPageConfig) => {
        page.children.push(field.added.element)
      }, HANDLE_VL[HANDLE_KV.ADD_FIELD_AFTER])
    } else {
      updateHistory((page: IPageConfig) => {
        page.children.splice(newIndex, 0, field.added.element)
      }, HANDLE_VL[HANDLE_KV.ADD_FIELD_BEFORE])
    }
  }
}

export function addPageNestChildrenByDrag(updateHistory: updateHistoryFn) {
  return function (field: VueDraggableChangeEvent<IFieldConfig>, parrentField: IFieldConfig) {
    const newIndex = field.added.newIndex
    console.log('in newIndex: ', newIndex)

    const nestChildren = parrentField.children

    if (newIndex === nestChildren.length) {
      updateHistory((page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === parrentField._id
        ) as unknown as IFieldConfig

        fieldItem.children.push(field.added.element)
      }, HANDLE_VL[HANDLE_KV.ADD_NEST_FIELD_AFTER])
    } else {
      updateHistory((page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === parrentField._id
        ) as unknown as IFieldConfig

        fieldItem.children.splice(newIndex, 0, field.added.element)
      }, HANDLE_VL[HANDLE_KV.ADD_NEST_FIELD_BEFORE])
    }
  }
}

/**
 * @description 添加组件
 */
export function addPageChildren(updateHistory: updateHistoryFn, currentPage: Ref<IPageConfig>) {
  return function (field: IFieldConfig, type: HandleKey) {
    const index = currentPage.value.children.findIndex((item) => item._id === field._id)

    if (type === HANDLE_KV.ADD_FIELD_BEFORE) {
      updateHistory((page: IPageConfig) => {
        if (index === 0) {
          page.children.unshift(field)
        } else {
          page.children.splice(index - 1, 0, field)
        }
      }, HANDLE_VL[HANDLE_KV.ADD_FIELD_BEFORE])
    }
    if (type === HANDLE_KV.ADD_FIELD_AFTER) {
      updateHistory((page: IPageConfig) => {
        if (index === page.children.length - 1) {
          page.children.push(field)
        } else {
          page.children.splice(index + 1, 0, field)
        }
      }, HANDLE_VL[HANDLE_KV.ADD_FIELD_AFTER])
    }
  }
}

/**
 * @description 删除组件
 */
export function deletePageChildren(updateHistory: updateHistoryFn) {
  return function (field: IFieldConfig) {
    updateHistory((page: IPageConfig) => {
      page.children.splice(
        page.children.findIndex((item) => item._id === field._id),
        1
      )
    }, HANDLE_VL[HANDLE_KV.DELETE_FIELD])
  }
}

export function movePageChildren(updateHistory: updateHistoryFn, currentPage: Ref<IPageConfig>) {
  return function (field: IFieldConfig, type: HandleKey) {
    const index = currentPage.value.children.findIndex((item) => item._id === field._id)

    if (type === HANDLE_KV.MOVE_FIELD_UP) {
      updateHistory((page: IPageConfig) => {
        if (index === 0) {
          return
        }

        ;[page.children[index - 1], page.children[index]] = [
          page.children[index],
          page.children[index - 1]
        ]
      }, HANDLE_VL[HANDLE_KV.MOVE_FIELD_UP])
    }

    if (type === HANDLE_KV.MOVE_FIELD_DOWN) {
      updateHistory((page: IPageConfig) => {
        if (index === page.children.length) {
          return
        }

        ;[page.children[index + 1], page.children[index]] = [
          page.children[index],
          page.children[index + 1]
        ]
      }, HANDLE_VL[HANDLE_KV.MOVE_FIELD_DOWN])
    }
  }
}

/**
 * @description 清空页面组件
 */
export function clearPageChildren(updateHistory: updateHistoryFn) {
  return function () {
    updateHistory((page: IPageConfig) => {
      page.children = []
    }, HANDLE_VL[HANDLE_KV.CLEAR_PAGE])
  }
}

/**
 * @description 导入页面组件
 */
export function updatePageChildren(updateHistory: updateHistoryFn) {
  return function (pageChildren: IFieldConfig[], handleKey: HandleKey = HANDLE_KV.UPDATE_PAGE) {
    updateHistory((page: IPageConfig) => {
      page.children = pageChildren
    }, HANDLE_VL[handleKey])
  }
}
