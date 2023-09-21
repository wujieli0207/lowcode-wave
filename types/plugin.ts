export interface IBasePlugin {
  key: string
  label: string
  order: number
  icon?: unknown // TODO
  tips?: string // 用于提示
  setup: () => JSX.Element
}

export type VueDraggableChangeEventKey = 'added' | 'removed' | 'moved'

export type VueDraggableChangeEvent<T = any> = {
  [key in VueDraggableChangeEventKey]: {
    newIndex: number
    element: T // 移动后的元素
    oldIndex?: number // moved 时才有
  }
}

export interface IVueDraggableSlotParams<T> {
  element: T
  index?: number
}
