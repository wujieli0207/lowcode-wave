import { IFieldConfig, IFieldProps, IPageConfig } from '#/editor'
import { HANDLE_KV, HANDLE_VL } from '@/constant/eventConstant'
import useHistory from '@/hooks/useHistory'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { find } from 'tree-lodash'
import { reactive, ref } from 'vue'
import {
  addPageChildren,
  addPageChildrenByDrag,
  clearPageChildren,
  deletePageChildren,
  importPageChildren,
  movePageChildren
} from './page'
import { handleSetFocus as handleSetFocusFn } from './field'

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

  // ========== field 相关操作,存在副作用 =========
  const handleSetFocus = handleSetFocusFn(updateHistory)

  function setCurrentFiled(field: IFieldConfig, isSetFocus: boolean = true) {
    // ! 此处的深拷贝为了移除不可变性，便于操作数据
    // 即 currentPage 是 immer 的不可变数据，而 currentField 是可变数据
    currentField.value = cloneDeep(field)

    // 选中当前组件
    isSetFocus && handleSetFocus(currentField.value)
  }

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
    // page 相关操作
    addPageChildren: addPageChildren(updateHistory, currentPage),
    addPageChildrenByDrag: addPageChildrenByDrag(updateHistory, currentPage),
    deletePageChildren: deletePageChildren(updateHistory),
    clearPageChildren: clearPageChildren(updateHistory),
    importPageChildren: importPageChildren(updateHistory),
    movePageChildren: movePageChildren(updateHistory, currentPage),
    // field 相关操作
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
