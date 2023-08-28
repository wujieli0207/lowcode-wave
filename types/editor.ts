/**
 * project 项目 -> page 页面 -> field 组件
 */

import type { CSSProperties } from 'vue'
import { IInputPropsConfig } from '@/components/UIComponents/Button/createProps'

export interface IProjectConfig {
  projectId: string
  projectName: string
  childrens: IPageConfig[]
}

export interface IPageConfig {
  pageId: string
  pageName: string
  pageRoute: string // 页面路由
  childrens: IFieldConfig[]
}

export interface IFieldConfig {
  _id: string
  fieldCode: string
  fieldName: string
  type: string // 组件类型
  value: unknown // 组件绑定数据
  props: IFieldProps
  events: IEvent[]
  styles: CSSProperties
}

export type IFieldProps = IFieldBasicProps | IInputPropsConfig

export interface IFieldBasicProps {
  isRequired?: boolean | string // 是否必填，true-必填，支持表达式
  isShow?: boolean | string // 是否显示，true-显示，支持表达式
  isEdit?: boolean | string // 是否可编辑，true-可编辑，支持表达式
}

export interface IEvent {}
