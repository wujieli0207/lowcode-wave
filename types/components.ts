import { UI_KV } from '@/constant/componentConstant'

export interface IUIComponent {
  label: string // 组件标题
  type: ValueOf<typeof UI_KV> // 组件类型
  isBasic: boolean // 是否是基础组件，true 表示基础组件
  tags: string[] // 标签
  preview: () => JSX.Element // 预览
  render: () => JSX.Element // 渲染
}
