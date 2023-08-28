import { ComponentConfigProps, ComponentConfigType } from '#/components'

interface IDefaultPropsConfig {
  label: ComponentConfigProps['label']
  tips?: ComponentConfigProps['tips']
  defaultValue?: ComponentConfigProps['defaultValue']
}

interface ISelectPropsConfig extends IDefaultPropsConfig {
  options: ComponentConfigProps['options']
}

interface IInputPropsConfig extends IDefaultPropsConfig {}

interface IInputNumberPropsConfig extends IDefaultPropsConfig {
  min?: ComponentConfigProps['min']
  max?: ComponentConfigProps['max']
}

interface ISwitchPropsConfig extends IDefaultPropsConfig {}

/**
 * @description 创建下拉选择的配置项
 */
export function createSelectPropsConfig(params: ISelectPropsConfig) {
  const { label, options, tips, defaultValue } = params
  return {
    type: ComponentConfigType.SELECT,
    label,
    options,
    tips,
    defaultValue
  }
}

/**
 * @description 创建输入框的配置项
 */
export function createInputPropsConfig(params: IInputPropsConfig) {
  const { label, tips, defaultValue } = params
  return {
    type: ComponentConfigType.INPUT,
    label,
    tips,
    defaultValue
  }
}

/**
 * @description 创建数字输入框的配置项
 */
export function createInputNumberPropsConfig(params: IInputNumberPropsConfig) {
  const { label, tips, defaultValue, min, max } = params
  return {
    type: ComponentConfigType.INPUT_NUMBER,
    label,
    tips,
    defaultValue,
    min,
    max
  }
}

/**
 * @description 创建开关的配置项
 */
export function createSwitchPropsConfig(params: ISwitchPropsConfig) {
  const { label, tips, defaultValue } = params
  return {
    type: ComponentConfigType.SWITCH,
    label,
    tips,
    defaultValue
  }
}
