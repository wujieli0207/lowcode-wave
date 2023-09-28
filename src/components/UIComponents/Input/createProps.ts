import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import {
  createInputNumberPropsConfig,
  createInputPropsConfig,
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
      children: {
        placeholder: createInputPropsConfig({
          label: '占位文本'
        }),
        clearable: createSwitchPropsConfig({
          label: '是否显示清除按钮',
          defaultValue: true,
          activeText: '是',
          inactiveText: '否',
          tips: '只有当 type 不是 textarea时生效'
        }),
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
        }),
        size: createSelectPropsConfig({
          label: '输入框尺寸',
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
          ],
          tips: '只在 type 不为 textarea 时有效'
        }),
        prefixIcon: createInputPropsConfig({
          label: '自定义前缀图标'
        }),
        suffixIcon: createInputPropsConfig({
          label: '自定义后缀图标'
        }),
        showPassword: createSwitchPropsConfig({
          label: '是否显示切换密码图标',
          defaultValue: false,
          activeText: '是',
          inactiveText: '否',
          tips: '输入框类型是密码时才生效'
        }),
        rows: createInputNumberPropsConfig({
          label: '输入框行数',
          tips: '只在 type 为 textarea 时有效'
        }),
        autosize: createSwitchPropsConfig({
          label: 'textarea 高度自适应',
          defaultValue: true,
          activeText: '是',
          inactiveText: '否',
          tips: '只在 type 为 textarea 时有效'
        }),
        autofocus: createSwitchPropsConfig({
          label: '自动获取焦点',
          defaultValue: true,
          activeText: '是',
          inactiveText: '否'
        }),
        resize: createSelectPropsConfig({
          label: '缩放方式',
          options: [
            {
              label: 'none',
              value: 'none'
            },
            {
              label: 'both',
              value: 'both'
            },
            {
              label: 'horizontal',
              value: 'horizontal'
            },
            {
              label: 'vertical',
              value: 'vertical'
            }
          ],
          tips: '只在 type 不为 textarea 时有效'
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
