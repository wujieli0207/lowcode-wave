import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import {
  createInputNumberPropsConfig,
  createSelectPropsConfig,
  createSwitchPropsConfig
} from '@/utils/ui-components'

export interface IInputPropsConfig {
  type?: 'text' | 'textarea' | 'password' // 输入框类型
  maxlength?: number // 最大长度
  minlength?: number // 最小长度
}

export function createProps(): IComponentConfigPropGroup<IFieldProps>[] {
  return [
    {
      groupName: '基础',
      childrens: {
        type: createSelectPropsConfig({
          label: '输入框类型',
          options: [
            {
              label: '单行文本',
              value: 'text'
            },
            {
              label: '多行文本',
              value: 'textarea'
            },
            {
              label: '密码',
              value: 'password'
            }
          ]
        }),
        maxlength: createInputNumberPropsConfig({
          label: '最大长度'
        }),
        minlength: createInputNumberPropsConfig({
          label: '最小长度'
        })
      }
    },
    {
      groupName: '状态',
      childrens: {
        isRequired: createSwitchPropsConfig({
          label: '必填',
          defaultValue: false
        }),
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
