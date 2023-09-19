import { Ref } from 'vue'
import { foreach, find } from 'tree-lodash'
import { FieldEvents, IFieldConfig, IFieldProps, IPageConfig, IOperation } from '#/editor'
import { HANDLE_KV, HANDLE_VL } from '@/constant/eventConstant'
import { updateHistoryFn } from './page'

type setCurrentFiledFn = (field: IFieldConfig, isSetFocus?: boolean) => void

/**
 * @description 更新 currentPage 之后,重置当前选中组件
 */
export function resetCurrentField(setCurrentFiled: setCurrentFiledFn) {
  return function (currentPage: Ref<IPageConfig>, currentField: Ref<Nullable<IFieldConfig>>) {
    if (currentField.value) {
      const fieldItem = find(
        currentPage.value.children,
        (item) => (item as unknown as IFieldConfig)._id === currentField.value?._id
      ) as unknown as IFieldConfig

      setCurrentFiled(fieldItem, false)
    }
  }
}

/**
 * @description 设置组件是否被选中
 */
export function handleSetFocus(updateHistory: updateHistoryFn) {
  return function (field: IFieldConfig) {
    updateHistory((page: IPageConfig) => {
      foreach(page.children, (item) => {
        ;(item as unknown as IFieldConfig).isFocus =
          (item as unknown as IFieldConfig)._id === field._id
      })
    }, HANDLE_VL[HANDLE_KV.SET_FOCUS])
  }
}

/**
 * @description 更新组件绑定 key
 */
export function updateFieldCode(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, code: string) {
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
}

/**
 * @description 更新组件 props 属性
 */
export function updateFieldProps(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, propsObj: IFieldProps) {
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
}

/**
 * @description 更新组件 styles 样式
 */
export function updateFieldStyles(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, stylesObj: IFieldProps) {
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
}

// ========== 组件绑定事件相关操作 ==========
/**
 * @description 添加组件事件
 */
export function addFieldEvent(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, fieldEvent: FieldEvents) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.events = {
          ...fieldItem.events,
          ...fieldEvent
        }
      },
      HANDLE_VL[HANDLE_KV.ADD_EVENT],
      {
        callback: (patches) => {
          if (currentField.value?.events) {
            currentField.value.events = {
              ...currentField.value.events,
              ...patches[0].value
            }
          }
        }
      }
    )
  }
}

/**
 * @description 删除组件事件
 */
export function deleteFieldEvent(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, eventKey: string) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        delete fieldItem.events[eventKey]
      },
      HANDLE_VL[HANDLE_KV.DELETE_EVENT],
      {
        callback: (patches) => {
          if (currentField.value?.events) {
            delete currentField.value.events[patches[0].path[3]]
          }
        }
      }
    )
  }
}

/**
 * @description 增加组件事件操作
 */
export function addFieldEventOperation(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, eventKey: string, operationArgs: IOperation) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.events[eventKey].actions.push(operationArgs)
      },
      HANDLE_VL[HANDLE_KV.ADD_OPERATION],
      {
        callback: (patches) => {
          if (currentField.value?.events[eventKey]) {
            const currentActions = Object.assign([], currentField.value.events[eventKey].actions)
            currentActions.push(patches[0].value)

            currentField.value.events = {
              ...currentField.value.events,
              [eventKey]: {
                actions: currentActions
              }
            }
          }
        }
      }
    )
  }
}

/**
 * @description 移动组件事件操作
 */
export function moveFieldEventOperation(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, eventKey: string, actions: IOperation[]) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.events[eventKey].actions = actions
      },
      HANDLE_VL[HANDLE_KV.MOVE_OPERATION],
      {
        callback: (patches) => {
          if (currentField.value?.events[eventKey]) {
            currentField.value.events[eventKey].actions = patches[0].value
          }
        }
      }
    )
  }
}

/**
 * @description 删除组件事件操作
 */
export function deleteFieldEventOperation(
  currentField: Ref<Nullable<IFieldConfig>>,
  updateHistory: updateHistoryFn
) {
  return function (field: IFieldConfig, eventKey: string, operation: IOperation) {
    updateHistory(
      (page: IPageConfig) => {
        const fieldItem = find(
          page.children,
          (item) => (item as unknown as IFieldConfig)._id === field._id
        ) as unknown as IFieldConfig

        fieldItem.events[eventKey].actions.splice(
          fieldItem.events[eventKey].actions.findIndex(
            (action: IOperation) => action.type === operation.type
          ),
          1
        )
      },
      HANDLE_VL[HANDLE_KV.DELETE_OPERATION],
      {
        callback: () => {
          if (currentField.value?.events[eventKey]) {
            const currentActions = Object.assign([], currentField.value.events[eventKey].actions)
            currentActions.splice(
              currentActions.findIndex((item: IOperation) => item.type === operation.type),
              1
            )

            currentField.value.events = {
              ...currentField.value.events,
              [eventKey]: {
                actions: currentActions
              }
            }
          }
        }
      }
    )
  }
}
