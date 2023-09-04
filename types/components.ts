import { UI_KV } from '@/constant/componentConstant'
import { IFieldConfig, IFieldProps } from './editor'

export interface IUIComponent {
  label: string // 组件标题
  type: ValueOf<typeof UI_KV> // 组件类型
  isBasic: boolean // 是否是基础组件，true 表示基础组件
  tags: string[] // 标签
  preview: () => JSX.Element // 预览
  render: (params: IUIComponentRenderParams) => JSX.Element // 渲染
  props: IComponentConfigPropGroup<IFieldProps>[] // 组件支持配置的属性
}

export interface IUIComponentRenderParams {
  props: IFieldConfig['props']
  styles: IFieldConfig['styles']
  element: IFieldConfig
}

// 组件支持配置的属性
export type ComponentConfigProps = {
  type: ComponentConfigType
  label: string // 配置项标题
  tips?: string // 配置项提示
  defaultValue?: string | number | false // 配置项默认值
} & {
  options?: ComponentConfigOptions[]
} & {
  min?: number
  max?: number
}

// 属性配置分组
export interface IComponentConfigPropGroup<T> {
  groupName: string
  children: Record<keyof T, ComponentConfigProps>
}

export enum ComponentConfigType {
  INPUT = 'input',
  INPUT_NUMBER = 'inputNumber',
  SELECT = 'select',
  SWITCH = 'switch'
}

export interface ComponentConfigOptions {
  label: string
  value: string | number
}
