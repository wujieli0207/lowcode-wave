import uiComponents from '@/components/UIComponents'
import { IFieldConfig } from '#/editor'

/**
 * @description 初始化激活的属性折叠面板
 */
export function initActiveCollapse(currentField: Nullable<IFieldConfig>) {
  const result: string[] = ['general']

  if (currentField) {
    const fieldConfig = uiComponents[currentField.type]
    fieldConfig.props.forEach((item) => {
      result.push(item.groupName)
    })
  }

  return result
}
