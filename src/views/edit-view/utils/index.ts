import uiComponents from '@/components/UIComponents'
import { UI_TAG_KV } from '@/constant/componentConstant'
import { IFieldConfig } from '#/editor'

/**
 *
 * @description 判断是否是容器组件
 */
export function getIsContainerComponent(element: IFieldConfig) {
  return uiComponents[element.type].tags.includes(UI_TAG_KV.CONTAINER)
}
