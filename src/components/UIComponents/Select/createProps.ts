import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import {
  createInputNumberPropsConfig,
  createInputPropsConfig,
  createSelectPropsConfig,
  createSwitchPropsConfig
} from '@/utils/ui-components'

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
        placeholder: createInputPropsConfig({
          label: '占位符'
        }),
        clearable: createSwitchPropsConfig({
          label: '是否可以清空',
          defaultValue: true,
          activeText: '是',
          inactiveText: '否'
        }),
        filterable: createSwitchPropsConfig({
          label: '是否可以筛选',
          defaultValue: true,
          activeText: '是',
          inactiveText: '否'
        }),
        size: createSelectPropsConfig({
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
        })
        // TODO 是否可以多选可能存在问题
        // multiple: createSwitchPropsConfig({
        //   label: '是否可以多选',
        //   defaultValue: false,
        //   activeText: '是',
        //   inactiveText: '否'
        // }),
        // collapseTags: createSwitchPropsConfig({
        //   label: '多选时选中值以文字形式展示',
        //   defaultValue: false,
        //   activeText: '是',
        //   inactiveText: '否'
        // }),
        // multipleLimit: createInputNumberPropsConfig({
        //   label: '多选最多选择项目数'
        // })
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
