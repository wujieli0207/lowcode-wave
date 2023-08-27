import { IUIComponent } from '#/components'
import { IFieldConfig } from '#/editor'
import { generateNanoId } from '@/utils'

/**
 * @description 创建复制的组件实例
 */
export function cloneFieldInstance(fieldElement: IUIComponent): IFieldConfig {
  console.log('generateNanoId(): ', generateNanoId())
  return {
    _id: `id_${generateNanoId()}`,
    fieldCode: fieldElement.type,
    fieldName: fieldElement.label,
    type: fieldElement.type,
    value: '',
    props: {},
    events: [],
    styles: {}
  }
}
