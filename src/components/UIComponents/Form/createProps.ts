import { IComponentConfigPropGroup } from '#/components'
import { IFieldProps } from '#/editor'
import {
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
        inline: createSwitchPropsConfig({
          label: '行内表单模式',
          defaultValue: false
        }),
        labelPosition: createSelectPropsConfig({
          label: '标签的位置',
          options: [
            {
              label: 'left',
              value: 'left'
            },
            {
              label: 'right',
              value: 'right'
            },
            {
              label: 'top',
              value: 'top'
            }
          ],
          tips: '当设置为 left 或 right 时，则也需要设置 label-width 属性'
        }),
        labelWidth: createInputPropsConfig({
          label: '标签长度',
          tips: '例如 50px。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto'
        }),
        labelSuffix: createInputPropsConfig({
          label: '表单域标签后缀'
        }),
        hideRequiredAsterisk: createSwitchPropsConfig({
          label: '隐藏必填星号',
          defaultValue: false
        }),
        requireAsteriskPosition: createSelectPropsConfig({
          label: '必填星号的位置',
          options: [
            {
              label: 'left',
              value: 'left'
            },
            {
              label: 'right',
              value: 'right'
            }
          ]
        }),
        showMessage: createSwitchPropsConfig({
          label: '显示校验错误信息',
          defaultValue: true
        }),
        inlineMessage: createSwitchPropsConfig({
          label: '行内形式展示校验信息',
          defaultValue: false
        }),
        statusIcon: createSwitchPropsConfig({
          label: '输入框显示校验结果反馈图标',
          defaultValue: false
        }),
        validateOnRuleChange: createSwitchPropsConfig({
          label: 'rules属性改变后立即触发验证',
          defaultValue: true
        }),
        size: createSelectPropsConfig({
          label: '表单内组件尺寸',
          options: [
            {
              label: '不设置',
              value: ''
            },
            {
              label: '默认',
              value: '默认'
            },
            {
              label: 'large',
              value: 'large'
            },
            {
              label: 'small',
              value: 'small'
            }
          ]
        }),
        disabled: createSwitchPropsConfig({
          label: '禁用表单内所有组件',
          defaultValue: false,
          tips: '如果设置为 true, 它将覆盖内部组件的 disabled 属性'
        }),
        scrollToError: createSwitchPropsConfig({
          label: '校验失败滚动到第一个错误项',
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
        })
      }
    }
  ]
}
