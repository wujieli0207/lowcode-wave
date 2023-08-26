export interface IUIComponent {
  key: string
  label: string // 组件标题
  isBasic: boolean // 是否是基础组件，true 表示基础组件
  tags: string[] // 标签
  preview: () => JSX.Element // 预览
  render: () => () => JSX.Element // 渲染
}
