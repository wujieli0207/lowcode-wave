import { HandleKey, IFieldConfig, IFieldProps, IPageConfig } from '#/editor'
import { VueDraggableChangeEvent } from '#/plugin'
import { HANDLE_KV, HANDLE_VL } from '@/constant/eventConstant'
import useHistory from '@/hooks/useHistory'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { foreach, find } from 'tree-lodash'
import { reactive, ref } from 'vue'

const defaultPage: IPageConfig = {
  pageId: 'home',
  pageName: '首页',
  pageRoute: '/home',
  children: []
}

interface IJsonConfig {
  currentField: Nullable<IFieldConfig>
  defaultPage: IPageConfig // 当前操作的页面
}

export const useJsonConfigStore = defineStore('jsonConfig', () => {
  const currentField = ref<Nullable<IFieldConfig>>(null) // 当前选中的组件

  const jsonConfig: IJsonConfig = reactive({
    currentField: null,
    defaultPage
  })

  // 记录历史记录
  const {
    state: currentPage,
    update: updateHistory,
    undoCount,
    redoCount,
    enable,
    undo,
    redo,
    undoStack,
    jumpTo
  } = useHistory(defaultPage)
  enable()

  // ========== field 相关操作 =========
  function setCurrentFiled(field: IFieldConfig, isSetFocus: boolean = true) {
    // ! 此处的深拷贝为了移除不可变性，便于操作数据
    // 即 currentPage 是 immer 的不可变数据，而 currentField 是可变数据
    currentField.value = cloneDeep(field)

    // 选中当前组件
    isSetFocus && handleSetFocus(currentField.value)
  }

  /**
   *
   * @description 设置组件是否被选中
   */
  function handleSetFocus(field: IFieldConfig) {
    updateHistory((page: IPageConfig) => {
      foreach(page.children, (item) => {
        ;(item as unknown as IFieldConfig).isFocus =
          (item as unknown as IFieldConfig)._id === field._id
      })
    }, HANDLE_VL[HANDLE_KV.SET_FOCUS])
  }

  // ========== page 相关操作 =========
  function updatePageChildren(children: IFieldConfig[]) {
    updateHistory((page: IPageConfig) => {
      page.children = children
    }, 'updatePageChildren')
  }

  /**
   * @description 通过拖动添加组件
   */
  function addPageChildrenByDrag(field: VueDraggableChangeEvent<IFieldConfig>) {
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

  /**
   * @description 添加组件
   */
  function addPageChildren(field: IFieldConfig, type: HandleKey) {
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

  /**
   * @description 删除组件
   */
  function deletePageChildren(field: IFieldConfig) {
    updateHistory((page: IPageConfig) => {
      page.children.splice(
        page.children.findIndex((item) => item._id === field._id),
        1
      )
    }, HANDLE_VL[HANDLE_KV.DELETE_FIELD])
  }

  function movePageChildren(field: IFieldConfig, type: HandleKey) {
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

  function clearPageChildren() {
    updateHistory((page: IPageConfig) => {
      page.children = []
    }, HANDLE_VL[HANDLE_KV.CLEAR_PAGE])
  }

  function importPageChildren(pageChildren: IFieldConfig[]) {
    updateHistory((page: IPageConfig) => {
      page.children = pageChildren
    }, HANDLE_VL[HANDLE_KV.IMPORT_PAGE])
  }

  // ========== field 相关操作 ==========
  function updateFieldCode(field: IFieldConfig, code: string) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.fieldCode = code
      },
      HANDLE_VL[HANDLE_KV.UPDATE_FIELD_CODE],
      {
        callback: (patches) => {
          if (currentField.value?.fieldCode) {
            currentField.value.fieldCode = patches[0].value
          }
        }
      }
    )
  }

  function updateFieldProps(field: IFieldConfig, propsObj: IFieldProps) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.props = {
          ...fieldItem.props,
          ...propsObj
        }
      },
      HANDLE_VL[HANDLE_KV.UPDATE_PROPS],
      {
        callback: (patches) => {
          if (currentField.value?.props) {
            currentField.value.props = {
              ...currentField.value.props,
              ...patches[0].value
            }
          }
        }
      }
    )
  }

  function updateFieldStyles(field: IFieldConfig, stylesObj: IFieldProps) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.styles = {
          ...fieldItem.styles,
          ...stylesObj
        }
      },
      HANDLE_VL[HANDLE_KV.UPDATE_STYLES],
      {
        callback: (patches) => {
          if (currentField.value?.styles) {
            currentField.value.styles = {
              ...currentField.value.styles,
              ...patches[0].value
            }
          }
        }
      }
    )
  }

  return {
    jsonConfig,
    currentField,
    currentPage,
    setCurrentFiled,
    clearPageChildren,
    // page 相关操作
    updatePageChildren,
    addPageChildren,
    addPageChildrenByDrag,
    deletePageChildren,
    importPageChildren,
    // field 相关操作
    movePageChildren,
    updateFieldCode,
    updateFieldProps,
    updateFieldStyles,
    // 撤销和重做
    undoCount,
    redoCount,
    undoStack,
    undo,
    redo,
    jumpTo
  }
})
