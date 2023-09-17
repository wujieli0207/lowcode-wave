import { defineConstants } from '@/utils/defineConstants'

/**
 * @description 组件触发方式
 */
export const { EVENT_KV, EVENT_VL } = defineConstants(
  [
    { key: 'CLICK', value: 'click', label: '点击' },
    { key: 'CHANGE', value: 'change', label: '改变' },
    { key: 'HOVER', value: 'hover', label: '悬浮' },
    { key: 'FOCUS', value: 'focus', label: '聚焦' },
    { key: 'BLUR', value: 'blur', label: '失焦' }
  ] as const,
  'EVENT'
)

/**
 * @description 触发后的操作
 */
export const { OP_TYPE_KV, OP_TYPE_VL } = defineConstants(
  [
    // 页面操作
    { key: 'REDIRECT', value: 'redirect', label: '跳转链接' },
    { key: 'OPEN', value: 'open', label: '打开页面' },
    { key: 'REFRESH_PAGE', value: 'refreshPage', label: '刷新页面' },
    // 组件操作
    { key: 'VISIBLE', value: 'visible', label: '组件是否展示' },
    { key: 'USABLE', value: 'usable', label: '组件是否可用' },
    { key: 'REQUIRED', value: 'required', label: '组件是否必填' },
    { key: 'REFRESH_DATA', value: 'refreshData', label: '刷新数据' },
    { key: 'CLEAR', value: 'clear', label: '清空数据' },
    { key: 'SET_VALUE', value: 'setValue', label: '变量赋值' }
  ] as const,
  'OP_TYPE'
)

/**
 * @description 定于用户操作类型，用于撤销和重做
 */
export const { HANDLE_KV, HANDLE_VL } = defineConstants(
  [
    // 页面相关
    { key: 'IMPORT_PAGE', value: 'importPage', label: '导入页面' },
    { key: 'CLEAR_PAGE', value: 'clearPage', label: '清空页面' },
    // 组件相关
    { key: 'ADD_FIELD_BEFORE', value: 'addFieldBefore', label: '前置插入组件' },
    { key: 'ADD_FIELD_AFTER', value: 'addFieldAfter', label: '后置插入组件' },
    { key: 'SET_FOCUS', value: 'SET_FOCUS', label: '选中组件' },
    { key: 'DELETE_FIELD', value: 'deleteField', label: '删除组件' },
    { key: 'MOVE_FIELD_UP', value: 'moveFieldUp', label: '上移组件' },
    { key: 'MOVE_FIELD_DOWN', value: 'moveFieldDown', label: '下移组件' },
    // 属性相关
    { key: 'UPDATE_FIELD_CODE', value: 'updateFieldCode', label: '修改组件code' },
    { key: 'UPDATE_PROPS', value: 'updateProps', label: '修改属性' },
    { key: 'UPDATE_STYLES', value: 'updateStyles', label: '修改样式' },
    // 事件相关
    { key: 'ADD_PROPS', value: 'addProps', label: '增加事件' },
    { key: 'UPDATE_PROPS', value: 'updateProps', label: '修改事件' },
    { key: 'DELETE_PROPS', value: 'deleteProps', label: '删除事件' },
    { key: 'ADD_OPERATION', value: 'addOperation', label: '增加事件操作' },
    { key: 'UPDATE_OPERATION', value: 'updateOperation', label: '修改事件操作' },
    { key: 'DELETE_OPERATION', value: 'deleteOperation', label: '删除事件操作' },
    // 兜底操作
    { key: 'OTHER', value: 'other', label: '用户操作' }
  ] as const,
  'HANDLE'
)
