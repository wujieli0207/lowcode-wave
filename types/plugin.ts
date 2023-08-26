export interface IBasePlugin {
  key: string
  label: string
  order: number
  icon: unknown // TODO
  tips?: string // 用于提示
  setup: () => JSX.Element
}
