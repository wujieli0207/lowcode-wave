import { defineConstants } from '@/utils/defineConstants'

/**
 * @description 组件类型常量定义
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
