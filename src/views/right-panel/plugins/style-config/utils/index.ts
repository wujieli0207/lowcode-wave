import { IFieldConfig } from '#/editor'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'

const jsonConfigStore = useJsonConfigStore()
const { updateFieldStyles } = jsonConfigStore

interface IUpdateFieldStyles {
  value: string | number | boolean
  styleKey: string
  field: IFieldConfig
}
export function handleUpdateFieldStyles(params: IUpdateFieldStyles) {
  const { value, styleKey, field } = params

  updateFieldStyles(field, { [styleKey]: value })
}
