import { IFieldConfig, IEvent } from '#/editor'

/**
 * @description 添加事件
 */
export function handleAddEvent(field: IFieldConfig, event: IEvent) {
  field.events.push({
    type: event.type,
    args: {}
  })
}

/**
 * @description 删除事件
 */
export function handleDeleteEvent(field: IFieldConfig, event: IEvent) {
  field.events = field.events.filter((item) => item.type !== event.type)
}
