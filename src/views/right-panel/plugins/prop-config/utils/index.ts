import uiComponents from '@/components/UIComponents'
import { IFieldConfig } from '#/editor'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'

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

interface IUpdateFieldProps {
  value: string | number | boolean
  propKey: string
  field: IFieldConfig
}
export function handleUpdateFieldProps(params: IUpdateFieldProps) {
  const { value, propKey, field } = params

  updateFieldProps(field, { [propKey]: value })
}
