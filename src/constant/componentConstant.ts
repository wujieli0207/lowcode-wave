import { defineConstants } from '@/utils/defineConstants'

/**
 * @description 组件类型常量定义
 */
export const { UI_KV, UI_VL } = defineConstants(
  [
    { key: 'INPUT', value: 'input', label: '输入框' },
    { key: 'BUTTON', value: 'button', label: '按钮' },
    { key: 'SELECT', value: 'select', label: '下拉选择' },
    { key: 'LAYOUT', value: 'layout', label: '分栏布局' }
  ] as const,
  'UI'
)

export const { UI_TAG_KV, UI_TAG_VL } = defineConstants(
  [
    { key: 'BASE', value: 'base', label: '基础组件' },
    { key: 'CONTAINER', value: 'container', label: '容器组件' },
    { key: 'FORM', value: 'form', label: '表单组件' },
    { key: 'DATA', value: 'data', label: '数据展示' },
    { key: 'NOTICE', value: 'notice', label: '消息通知' },
    { key: 'OTHER', value: 'other', label: '其他' }
  ] as const,
  'UI_TAG'
)
