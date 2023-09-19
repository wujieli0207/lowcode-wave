import { IFieldConfig, IPageConfig } from '#/editor'
import useHistory from '@/hooks/useHistory'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  addPageChildren,
  addPageChildrenByDrag,
  clearPageChildren,
  deletePageChildren,
  updatePageChildren,
  movePageChildren
} from './page'
import {
  handleSetFocus as handleSetFocusFn,
  updateFieldCode,
  updateFieldProps,
  updateFieldStyles,
  addFieldEvent,
  deleteFieldEvent,
  addFieldEventOperation,
  moveFieldEventOperation,
  deleteFieldEventOperation,
  resetCurrentField
} from './field'

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

  return {
    jsonConfig,
    currentField,
    currentPage,
    setCurrentFiled,
    resetCurrentField: resetCurrentField(setCurrentFiled),
    // page 相关操作
    addPageChildren: addPageChildren(updateHistory, currentPage),
    addPageChildrenByDrag: addPageChildrenByDrag(updateHistory, currentPage),
    deletePageChildren: deletePageChildren(updateHistory),
    clearPageChildren: clearPageChildren(updateHistory),
    updatePageChildren: updatePageChildren(updateHistory),
    movePageChildren: movePageChildren(updateHistory, currentPage),
    // field 相关操作
    updateFieldCode: updateFieldCode(currentField, updateHistory),
    updateFieldProps: updateFieldProps(currentField, updateHistory),
    updateFieldStyles: updateFieldStyles(currentField, updateHistory),
    addFieldEvent: addFieldEvent(currentField, updateHistory),
    deleteFieldEvent: deleteFieldEvent(currentField, updateHistory),
    addFieldEventOperation: addFieldEventOperation(currentField, updateHistory),
    moveFieldEventOperation: moveFieldEventOperation(currentField, updateHistory),
    deleteFieldEventOperation: deleteFieldEventOperation(currentField, updateHistory),
    // 撤销和重做
    undoCount,
    redoCount,
    undoStack,
    undo,
    redo,
    jumpTo
  }
})
