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
