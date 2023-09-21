import {
  ComponentConfigType,
  IInputNumberPropsConfig,
  IInputPropsConfig,
  ISelectPropsConfig,
  ISwitchPropsConfig
} from '#/components'

/**
 * @description 创建下拉选择的配置项
 */
export function createSelectPropsConfig(params: ISelectPropsConfig) {
  const { label, options, tips, defaultValue, labelWidth, isRequired } = params
  return {
    type: ComponentConfigType.SELECT,
    label,
    options,
    tips,
    defaultValue,
    labelWidth,
    isRequired
  }
}

/**
 * @description 创建输入框的配置项
 */
export function createInputPropsConfig(params: IInputPropsConfig) {
  const { label, tips, defaultValue, labelWidth, isRequired } = params
  return {
    type: ComponentConfigType.INPUT,
    label,
    tips,
    defaultValue,
    labelWidth,
    isRequired
  }
}

/**
 * @description 创建数字输入框的配置项
 */
export function createInputNumberPropsConfig(params: IInputNumberPropsConfig) {
  const { label, tips, defaultValue, labelWidth, isRequired, min, max } = params
  return {
    type: ComponentConfigType.INPUT_NUMBER,
    label,
    tips,
    defaultValue,
    labelWidth,
    isRequired,
    min,
    max
  }
}

/**
 * @description 创建开关的配置项
 */
export function createSwitchPropsConfig(params: ISwitchPropsConfig) {
  const { label, tips, defaultValue, labelWidth = '220px', isRequired } = params
  return {
    type: ComponentConfigType.SWITCH,
    label,
    tips,
    defaultValue,
    labelWidth,
    isRequired
  }
}
