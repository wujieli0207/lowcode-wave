import { IUIComponent } from '#/components'
import { IFieldConfig } from '#/editor'
import { UI_TAG_VL } from '@/constant/componentConstant'
import { generateNanoId } from '@/utils'
import { cloneDeep } from 'lodash-es'

/**
 * @description 创建复制的组件实例
 */
export function cloneFieldInstance(fieldElement: IUIComponent): IFieldConfig {
  return {
    _id: `id_${generateNanoId()}`,
    fieldCode: fieldElement.type,
    fieldName: fieldElement.label,
    type: fieldElement.type,
    value: '',
    props: {},
    events: {},
    styles: _createDefaultStyles(),
    isFocus: false,
    children: []
  }
}

/**
 *
 * @description 拖动后赋值创建组件实例
 */
export function handleClone(fieldElement: IUIComponent) {
  return cloneFieldInstance(cloneDeep(fieldElement))
}

/**
 *
 * @description 组件根据标签分组
 */
export function getGroupComponentsByTag(tagObj: typeof UI_TAG_VL, componentsList: IUIComponent[]) {
  const result = {}
  Object.keys(tagObj).forEach((key) => {
    result[key] = []
  })

  componentsList.forEach((component) => {
    component.tags.forEach((tag) => {
      result[tag].push(component)
    })
  })

  // 过滤掉为空的组件
  Object.keys(result).forEach((key) => {
    if (result[key].length === 0) {
      delete result[key]
    }
  })

  return result
}

function _createDefaultStyles() {
  return {
    display: 'flex',
    justifyContent: 'flex-start'
    // paddingTop: '0',
    // paddingBottom: '0',
    // paddingLeft: '0',
    // paddingRight: '0',
    // marginTop: '0',
    // marginBottom: '0',
    // marginLeft: '0',
    // marginRight: '0'
  }
}
