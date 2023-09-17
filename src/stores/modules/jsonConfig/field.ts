import { IFieldConfig, IPageConfig } from '#/editor'
import { HANDLE_KV, HANDLE_VL } from '@/constant/eventConstant'
import { foreach } from 'tree-lodash'
import { updateHistoryFn } from './page'

/**
 *
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
