import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import {
  createInputPropsConfig,
  createSelectPropsConfig,
  createSwitchPropsConfig
} from '@/utils/ui-components'

export interface IButtonPropsConfig {
  buttonText?: string // 按钮文字
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' // 按钮类型
  round?: boolean // 是否圆角
  text?: boolean // 是否是文字按钮
}

export function createProps(): IComponentConfigPropGroup<IFieldProps>[] {
  return [
    {
      groupName: '基础',
      children: {
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
    },
    {
      groupName: '状态',
      children: {
        isHidden: createSwitchPropsConfig({
          label: '隐藏',
          defaultValue: false
        }),
        isDisabled: createSwitchPropsConfig({
          label: '禁用',
          defaultValue: false
        })
      }
    }
  ]
}
