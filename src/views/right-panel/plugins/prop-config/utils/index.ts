import uiComponents from '@/components/UIComponents'
import { IFieldConfig } from '#/editor'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { IUpdateValueFnParams } from '@/views/right-panel/components/FormItemConfigRenderer'

const jsonConfigStore = useJsonConfigStore()
const { updateFieldProps, updateFieldCode } = jsonConfigStore

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

export function handleUpdateFieldCode(field: IFieldConfig, code: string) {
  updateFieldCode(field, code)
}

export function handleUpdateFieldProps(params: IUpdateValueFnParams) {
  const { value, key, field } = params

  updateFieldProps(field, { [key]: value })
}
