/**
 * project 项目 -> page 页面 -> field 组件
 */

import type { CSSProperties } from 'vue'
import { IButtonPropsConfig } from '@/components/UIComponents/Button/createProps'
import { IInputPropsConfig } from '@/components/UIComponents/Input/createProps'
import { ISelectPropsConfig } from '@/components/UIComponents/Select/createProps'
import { EVENT_KV, OP_TYPE_KV } from '@/constant/eventConstant'

export interface IProjectConfig {
  projectId: string
  projectName: string
  children: IPageConfig[]
}

export interface IPageConfig {
  pageId: string
  pageName: string
  pageRoute: string // 页面路由
  children: IFieldConfig[]
}

export interface IFieldConfig {
  _id: string
  fieldCode: string
  fieldName: string
  type: string // 组件类型
  value: unknown // 组件绑定数据
  props: IFieldProps
  events: {
    [key in EventKey]?: IEventInstance
  }
  styles: CSSProperties
  isFocus: boolean // 是否是被选中状态
  children: IFieldConfig[] // 嵌套或者插槽元素
  slots?: ISlots[]
}

export type IFieldProps =
  | IFieldBasicProps
  | IButtonPropsConfig
  | IInputPropsConfig
  | ISelectPropsConfig

export interface IFieldBasicProps {
  isRequired?: boolean | string // 是否必填，true-必填，支持表达式
  isHidden?: boolean | string // 是否隐藏，true-隐藏，支持表达式
  isDisabled?: boolean | string // 是否禁用，true-禁用，支持表达式
}

export type EventKey = ValueOf<typeof EVENT_KV>

export interface IEventInstance {
  actions: IOperation[]
}

export type OperationType = ValueOf<typeof OP_TYPE_KV>

export interface IOperation {
  type: OperationType
  args: IoperationConfigArgs
}

export interface IoperationConfigArgs {
  desc: string // 参数描述
  [key: string]: unknown
}

export interface ISlots {
  key: string
  name: string
  [key: string]: unknown
}
