import { ComponentConfigProps } from '#/components'
import {
  createInputPropsConfig,
  createSelectPropsConfig,
  createSwitchPropsConfig
} from '@/utils/ui-components'

export interface IInputPropsConfig {
  buttonText?: string // 按钮文字
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' // 按钮类型
  round?: boolean // 是否圆角
  text?: boolean // 是否是文字按钮
}

export function createProps(): Record<keyof IInputPropsConfig, ComponentConfigProps> {
  return {
    buttonText: createInputPropsConfig({
      label: '按钮文字'
    }),
    type: createSelectPropsConfig({
      label: '按钮类型',
      options: [
        {
          label: '默认按钮',
          value: 'default'
        },
        {
          label: '主要按钮',
          value: 'primary'
        },
        {
          label: '成功按钮',
          value: 'success'
        },
        {
          label: '警告按钮',
          value: 'warning'
        },
        {
          label: '危险按钮',
          value: 'danger'
        }
      ]
    }),
    round: createSwitchPropsConfig({
      label: '是否圆角',
      defaultValue: false
    }),
    text: createSwitchPropsConfig({
      label: '是否是文字按钮',
      defaultValue: false
    })
  }
}
