import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import { createSelectPropsConfig, createSwitchPropsConfig } from '@/utils/ui-components'

export interface ISelectPropsConfig {
  size?: 'large' | 'default' | 'small' // 尺寸
  multiple?: boolean // 是否可以多选
  clearable?: boolean // 是否可以清空
}

export function createProps(): IComponentConfigPropGroup<IFieldProps>[] {
  return [
    {
      groupName: '基础',
      children: {
        type: createSelectPropsConfig({
          label: '尺寸',
          options: [
            {
              label: 'default',
              value: 'default'
            },
            {
              label: 'small',
              value: 'small'
            },
            {
              label: 'large',
              value: 'large'
            }
          ]
        }),
        multiple: createSwitchPropsConfig({
          label: '是否可以多选'
        }),
        clearable: createSwitchPropsConfig({
          label: '是否可以清空'
        })
      }
    },
    {
      groupName: '状态',
      children: {
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
